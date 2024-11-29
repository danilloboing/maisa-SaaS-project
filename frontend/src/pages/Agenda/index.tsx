import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Heading } from "@/components";
import { ReactDataTable } from "../../components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { useDisclosure, useCustomers, useServices, useAgenda, useToast } from "@/hooks";
import { Modal } from "@/components/Modal";
import { agendaColumns } from "./AgendaColumns";
import { AgendaType, Payment } from "@/types/agenda";
import { formatSelectInput } from "@/utils/format";
import { agendaSchema } from "@/constants/schemas/agenda-form";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectProps } from "@/types/components";
import { TimePickerHHmm } from "@/components/ui/time-picker";
import { selectAgendaStatus } from "@/constants/select-input";
import { Input } from "@/components/ui/input";

export default function Agenda() {
  const [id, setId] = useState<number | null>(null);
  const [paymentData, setPaymentData] = useState<Payment | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [serviceSelectInput, setServiceSelectInput] = useState<SelectProps[]>([
    { id: "", name: "" },
  ]);
  const [customerSelectInput, setCustomerSelectInput] = useState<SelectProps[]>(
    [{ id: "", name: "" }]
  );

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();
  const {
    isOpen: isOpenPaymentModal,
    onClose: onClosePaymentModal,
    onOpen: onOpenPaymentModal,
  } = useDisclosure();
  const { customers, getCustomers } = useCustomers();
  const { services, getServices } = useServices();
  
  const {
    agendas,
    createAgenda,
    getAgenda,
    inactiveAgenda,
    isLoading,
    updateAgenda,
    updatePayment
  } = useAgenda();

  const form = useForm({
    resolver: yupResolver(agendaSchema),
    defaultValues: {
      data: "",
      horario_inicio: "00:00:00",
      horario_fim: "00:00:00",
      data_pagamento: "",
      percent_desconto: 0,
    },
  });

  async function onSaveHandler(data: yup.Asserts<typeof agendaSchema>) {
    if (id) {
      updateAgenda({ ...data, id });
    } else {
      createAgenda(data);
    }

    return onCloseHandler();
  }

  function onSubmitDelete() {
    if (id) {
      inactiveAgenda(id);
    }

    return onCloseDeleteModal();
  }

  function onCloseHandler() {
    form.reset();
    form.setValue("horario_inicio", "00:00:00");
    form.setValue("horario_fim", "00:00:00");
    form.setValue("id_servico", 0);
    form.setValue("id_cliente", 0);
    form.setValue("status", "");
    form.setValue("observacao", "");
    form.setValue("data_pagamento", "");
    form.setValue("percent_desconto", 0);
    setId(null);
    onClose();
    onCloseDeleteModal();
  }

  const onEdit = (data: AgendaType) => {
    form.setValue("data", data.data.split("-").join("/"));
    form.setValue("horario_inicio", data.horario_inicio);
    form.setValue("horario_fim", data.horario_fim);
    form.setValue("id_servico", data.id_servico);
    form.setValue("id_cliente", data.id_cliente);
    form.setValue("status", data.status);
    form.setValue("observacao", data.observacao || "");
    form.setValue(
      "data_pagamento",
      data.pagamento.data_pagamento.split("-").join("/")
    );
    form.setValue("percent_desconto", data.pagamento.percent_desconto);
    setId(data.id);
    onOpen();
  };

  const onDelete = (data: AgendaType) => {
    setId(data.id);
    onOpenDeleteModal();
  };

  const onEditPaymentStatus = (data: Payment) => {
    setPaymentData(data);
    onOpenPaymentModal();
  };

  const onEditPayment = () => {
    if (paymentData && paymentStatus) {
      updatePayment({ ...paymentData, status: paymentStatus });
    }

    onClosePaymentModal();
  };

  useEffect(() => {
    const customer = formatSelectInput(customers);
    console.log(customer);
    setCustomerSelectInput(customer);

    const service = formatSelectInput(services);
    setServiceSelectInput(service);
  }, [customers, services]);

  useEffect(() => {
    getAgenda();
    getCustomers();
    getServices();
  }, []);

  const columns = useMemo(
    () => agendaColumns({ onEdit, onDelete, onEditPaymentStatus }),
    []
  );
  return (
    <>
      <div className="flex flex-row justify-between">
        <Heading title="Agenda" subtitle="Gerencie seus atendimentos" />
        <Button onClick={onOpen}>Adicionar</Button>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={onCloseHandler}
        title="Adicionar Atendimento"
        subtitle="Preencha os campos abaixo para adicionar um novo atendimento"
        onConfirm={form.handleSubmit(onSaveHandler)}
        isLoading={isLoading}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSaveHandler)}
            className="space-y-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormField
                  name="data"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor="nome">Data Atendimento</FormLabel>
                      <br />
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>

              <FormItem>
                <FormField
                  name="data_pagamento"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor="data_pagamento">
                        Data Pagamento
                      </FormLabel>
                      <br />
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormItem>
                <FormField
                  name="horario_inicio"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor="horario_inicio">
                        Horário Início
                      </FormLabel>
                      <TimePickerHHmm
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                />
              </FormItem>

              <FormItem>
                <FormField
                  name="horario_fim"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor="horario_fim">Horário Fim</FormLabel>
                      <TimePickerHHmm
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                />
              </FormItem>
            </div>

            <FormItem>
              <FormField
                name="id_servico"
                control={form.control}
                render={({ field }) => (
                  <>
                    <FormLabel htmlFor="id_servico">Serviço</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          className="text-slate-200"
                          placeholder="Selecione um serviço"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceSelectInput.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={String(service.id)}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </>
                )}
              />
            </FormItem>

            <FormItem>
              <FormField
                name="id_cliente"
                control={form.control}
                render={({ field }) => (
                  <>
                    <FormLabel htmlFor="id_cliente">Cliente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          className="text-slate-800"
                          placeholder="Selecione um cliente"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {customerSelectInput.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            value={String(customer.id)}
                          >
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </>
                )}
              />
            </FormItem>

            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormField
                  name="percent_desconto"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor="percent_desconto">Desconto</FormLabel>
                      <Input type="number" defaultValue={0} {...field} />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>

              <FormItem>
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor="status">Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue
                            className="text-slate-800"
                            placeholder="Selecione um status"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {selectAgendaStatus.map((status) => (
                            <SelectItem
                              key={status.id}
                              value={String(status.id)}
                            >
                              {status.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>
            </div>

            <FormItem>
              <FormField
                name="observacao"
                control={form.control}
                render={({ field }) => (
                  <>
                    <FormLabel htmlFor="observacao">Observação</FormLabel>
                    <Textarea className="mb-4" required {...field} />
                    <FormMessage />
                  </>
                )}
              />
            </FormItem>

            <FormItem></FormItem>
          </form>
        </Form>
      </Modal>

      <Modal
        title="Excluir Serviço"
        subtitle="Tem certeza que deseja excluir esse serviço?"
        onClose={onCloseDeleteModal}
        isOpen={isOpenDeleteModal}
        onConfirm={onSubmitDelete}
        isLoading={isLoading}
      >
        <div></div>
      </Modal>

      <Modal
        title="Editar Status Pagamento"
        subtitle="Edite o status do pagamento"
        onClose={onClosePaymentModal}
        isOpen={isOpenPaymentModal}
        onConfirm={onEditPayment}
        isLoading={isLoading}
      >
        <Select onValueChange={(value) => setPaymentStatus(value)}>
          <SelectTrigger>
            <SelectValue
              className="text-slate-800"
              placeholder="Selecione um status"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pago">Pago</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Atrasado">Atrasado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </Modal>

      {/* TABLE */}
      <ReactDataTable columns={columns} data={agendas} />
    </>
  );
}

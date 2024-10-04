import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'yup';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { servicesSchema } from '@/constants/schemas/services-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/Modal';
import { useDisclosure } from '@/hooks';
import { Heading } from '@/components';
import { ReactDataTable } from '../../components/DataTable/data-table';
import { serviceColumns } from './ServicesColumns';
import { useEffect, useMemo, useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { selectCategoria } from '@/constants/select-input';
import CurrencyInputField from '@/components/ui/input-currency';
import { ServiceType } from '@/types/services';

export function Services() {
  const [id, setId] = useState<number | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const {
    getServices,
    services,
    isLoading,
    createService,
    updateService,
    inactiveService,
  } = useServices();

  const form = useForm({
    resolver: yupResolver(servicesSchema),
  });

  function onSaveHandler(data: yup.Asserts<typeof servicesSchema>) {
    console.log(id);
    console.log(data);

    if (id) {
      updateService({ ...data, id });
      return onCloseHandler();
    }

    createService(data);
    return onCloseHandler();
  }

  function onSubmitDelete() {
    console.log(id);
    if (id) {
      inactiveService(id)
    };
    return onCloseDeleteModal();
  }

  function onCloseHandler() {
    form.setValue('nome', '');
    form.setValue('descricao', '');
    form.setValue('preco', 0);
    form.setValue('categoriaServico', 0);
    setId(null);
    onClose();
    onCloseDeleteModal();
  }

  const onEdit = (data: ServiceType) => {
    form.setValue('nome', data.nome);
    form.setValue('descricao', data.descricao);
    form.setValue('preco', data.preco);
    form.setValue('categoriaServico', data.categoria.id_categoria);
    setId(data.id);
    onOpen();
  };

  const onDelete = (data: ServiceType) => {
    setId(data.id);
    onOpenDeleteModal();
  };

  useEffect(() => {
    getServices();
  }, []);

  const columns = useMemo(() => serviceColumns({ onEdit, onDelete }), []);
  return (
    <>
      <div className='flex flex-row justify-between'>
        <Heading title='Serviços' subtitle='Veja, crie e edite seu serviços!' />
        <Button variant={'default'} onClick={onOpen}>
          Adicionar
        </Button>
        <Modal
          title='Adicionar Serviço'
          subtitle='Preencha os campos abaixo para adicionar um novo serviço'
          onClose={onCloseHandler}
          isOpen={isOpen}
          onConfirm={form.handleSubmit(onSaveHandler)}
          isLoading={isLoading}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSaveHandler)}
              className='space-y-2'
            >
              <FormItem>
                <FormField
                  name='nome'
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor='nome'>Serviço</FormLabel>
                      <Input
                        className='mb-4'
                        type='text'
                        placeholder='Coloração pessoal, Personal Shopper, ...'
                        required
                        {...field}
                      />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>

              <div className='grid grid-cols-2 space-x-3'>
                <FormItem>
                  <FormField
                    name='preco'
                    control={form.control}
                    render={() => (
                      <>
                        <FormLabel htmlFor='preco'>Preço</FormLabel>
                        <CurrencyInputField
                          value={form.getValues('preco')}
                          onValueChange={(value) => {
                            form.setValue('preco', Number(value));
                          }}
                        />
                        <FormMessage />
                      </>
                    )}
                  />
                </FormItem>

                <FormItem>
                  <FormField
                    name='categoriaServico'
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <FormLabel htmlFor='Categoria'>
                          Tipo de Serviço
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={String(field.value)}
                        >
                          <SelectTrigger>
                            <SelectValue
                              className='text-slate-200'
                              placeholder={'Selecione uma categoria'}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {selectCategoria.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
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
                  name='descricao'
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel htmlFor='descricao'>Descrição</FormLabel>
                        <Textarea
                          id='descricao'
                          placeholder='Dê mais algumas informações sobre o serviço'
                          className='resize-none mb-4'
                          required
                          {...field}
                        />
                      </FormItem>
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>
            </form>
          </Form>
        </Modal>

        <Modal
        title='Excluir Serviço'
        subtitle='Tem certeza que deseja excluir esse serviço?'
        onClose={onCloseDeleteModal}
        isOpen={isOpenDeleteModal}
        onConfirm={onSubmitDelete}
        isLoading={isLoading}
      >
        <div></div>
      </Modal>
      </div>

      {/* TABLE */}
      <ReactDataTable columns={columns} data={services} />
    </>
  );
}

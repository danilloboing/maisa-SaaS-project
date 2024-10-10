import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'yup';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Heading } from '@/components';
import { ReactDataTable } from '../../components/DataTable/data-table';
import { Button } from '@/components/ui/button';
import { useDisclosure, useCustomers } from '@/hooks';
import { customersSchema } from '@/constants/schemas/customers-form';
import { CustomerType } from '@/types/customers';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { customersColumns } from './CustomersColumns';
import { phoneMask } from '@/utils/phone-mask';

export const Customers = () => {
  const [id, setId] = useState<number | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const {
    getCustomers,
    customers,
    isLoading,
    createCustomer,
    updateCustomer,
    inactiveCustomer,
  } = useCustomers();

  const form = useForm({
    resolver: yupResolver(customersSchema),
  });

  function onSaveHandler(data: yup.Asserts<typeof customersSchema>) {
    console.log(id);
    console.log(data);

    if (id) {
      updateCustomer({ id, ...data });
    } else {
      createCustomer(data);
    }

    return onCloseHandler();
  }

  function onSubmitDelete() {
    if (id) {
      inactiveCustomer(id);
    }
    onCloseHandler();
  }

  function onCloseHandler() {
    form.setValue('nome', '');
    form.setValue('email', '');
    form.setValue('endereco', '');
    form.setValue('celular', '');
    setId(null);
    onClose();
    onCloseDeleteModal();
  }

  function onEdit(data: CustomerType) {
    form.setValue('nome', data.nome);
    form.setValue('email', data.email);
    form.setValue('endereco', data.endereco);
    form.setValue('celular', data.celular);
    setId(data.id);
    onOpen();
  }

  function onDelete(data: CustomerType) {
    setId(data.id);
    onOpenDeleteModal();
  }

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = useMemo(() => customersColumns({ onEdit, onDelete }), []);
  return (
    <>
      <div className='flex flex-row justify-between'>
        <Heading title='Clientes' subtitle='Veja, crie e edite seu clientes!' />
        <Button variant={'default'} onClick={onOpen}>
          Adicionar
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onCloseHandler}
          title='Adicionar Cliente'
          subtitle='Adicione um novo cliente'
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
                      <FormLabel htmlFor='nome'>Nome</FormLabel>
                      <Input className='mb-4' type='text' required {...field} />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>

              <FormItem>
                <FormField
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <Input
                        className='mb-4'
                        type='email'
                        required
                        {...field}
                        placeholder='example@gmail.com'
                      />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>
              <FormItem>
                <FormField
                  name='celular'
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor='celular'>Celular</FormLabel>
                      <Input
                        className='mb-4'
                        type='text'
                        required
                        placeholder='(00) 00000-0000'
                        {...field}
                        maxLength={15}
                        onChange={(e) => {
                          const maskedValue = phoneMask(e.target.value);
                          form.setValue('celular', maskedValue);
                          return maskedValue;
                        }}
                      />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>

              <FormItem>
                <FormField
                  name='endereco'
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor='endereco'>Endereço</FormLabel>
                      <Input className='mb-4' type='text' required {...field} />
                      <FormMessage />
                    </>
                  )}
                />
              </FormItem>
            </form>
          </Form>
        </Modal>

        <Modal
          isOpen={isOpenDeleteModal}
          onClose={onCloseDeleteModal}
          title='Deletar Cliente'
          subtitle='Tem certeza que deseja deletar este cliente?'
          onConfirm={onSubmitDelete}
          isLoading={isLoading}
        >
          <div></div>
        </Modal>
      </div>

      {/* TABLE */}
      <ReactDataTable columns={columns} data={customers} />
    </>
  );
};

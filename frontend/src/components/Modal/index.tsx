import { ModalProps } from '@/types/components';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import React from 'react';

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  onConfirm,
  title,
  subtitle,
  isOpen,
  isLoading,
}) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button isLoading={isLoading} variant='success' type='submit' onClick={onConfirm}>
              Confirmar
            </Button>
          </DialogFooter>
          <DialogClose asChild />
        </DialogContent>
      </Dialog>
    </>
  );
};

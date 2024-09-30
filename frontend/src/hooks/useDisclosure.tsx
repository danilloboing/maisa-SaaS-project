import { UseDisclosureProps } from '@/types/use-disclosure';
import { useState, useCallback } from 'react';

export function useDisclosure(initialState: boolean = false): UseDisclosureProps {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

import { createContext } from 'react'
import { ContextProps } from '@/types/context'
import { PagesValues } from '@/types/pages'

export const PagesContext = createContext<PagesValues | null>(null)

export default function PagesProvider({ children }: ContextProps) {

  function onChangeTitle(title: string) {
    if(title) {
      document.title = title
    } else {
      document.title = 'TMS - Billor'
    }
  }

  return (
    <PagesContext.Provider
      value={{
        onChangeTitle,
      }}
    >
      {children}
    </PagesContext.Provider>
  )
}

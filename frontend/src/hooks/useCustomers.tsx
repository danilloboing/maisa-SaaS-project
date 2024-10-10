import { CustomersContext } from "@/contexts/CustomersContext"
import { CustomersContextValues } from "@/types/customers"
import { useContext } from "react"

export const useCustomers = () => {
    return useContext(CustomersContext) as CustomersContextValues;
}
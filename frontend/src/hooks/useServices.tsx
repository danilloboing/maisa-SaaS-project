import { useContext } from "react";
import { ServicesContext } from "@/contexts/ServicesContext"
import { ServicesContextValues } from "@/types/services"

export const useServices = () => {
    return useContext(ServicesContext) as ServicesContextValues;
}
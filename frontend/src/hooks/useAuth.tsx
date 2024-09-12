import { useContext } from "react"
import { AuthContext } from "@/contexts/Auth"
import { AuthContextValues } from "@/types/auth"

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextValues;
}
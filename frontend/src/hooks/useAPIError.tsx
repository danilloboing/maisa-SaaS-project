import { useContext } from "react";

import { APIErrorContext } from "@/contexts/ApiError";
import { APIErrorContextValues } from "@/types/api-error";

export function useAPIError() {
  const { addError, error, removeError } = useContext(
    APIErrorContext
  ) as APIErrorContextValues;

  return { error, addError, removeError };
}

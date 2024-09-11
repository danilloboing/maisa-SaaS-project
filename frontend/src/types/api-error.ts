export type APIErrorContextValues = {
  error: string;
  removeError: () => void;
  addError: (message: string) => void;
};

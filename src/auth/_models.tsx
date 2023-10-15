import { ReactNode } from "react";

export interface authModel {
  accessToken: string;
}

export interface userModel {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  accessToken: string;
}

type childern = {
  children: ReactNode;
};

export { type childern };

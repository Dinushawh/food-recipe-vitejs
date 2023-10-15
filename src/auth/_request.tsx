import axios from "axios";
import { userModel } from "./_models";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getUserByToken(token: string) {
  console.log(token);
  const response = await axios.get<userModel>(`${BaseURL}/getuser/get-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

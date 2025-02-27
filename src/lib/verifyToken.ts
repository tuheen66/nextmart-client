"use server";

import { getNewToken } from "@/services/AuthService";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    //* decoding the token to get expiration time
    const decoded: { exp: number } = jwtDecode(token);

    //* comparing token expiration time with current time (Date.now()) and converting the expiration time into milliseconds
    return decoded.exp * 1000 < Date.now(); 
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }

  return token;
};




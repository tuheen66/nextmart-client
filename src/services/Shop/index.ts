"use server";

import { cookies } from "next/headers";

export const createShop = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
      method: "POST",
      headers: {
        //! need to send this for authorization, no need for Content-Type as this is a form data
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data, //! no need to stringify as it is form data
    });
    return res.json();
  } catch (err: any) {
    return Error(err);
  }
};

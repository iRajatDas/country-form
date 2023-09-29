import { getLocation } from "@/actions/getUserCountry";
import MyForm from "@/components/my-form";
import React from "react";

const FormPage = async () => {
  const country = await getLocation();
  return (
    <main className="h-screen w-full bg-slate-100 grid place-items-center">
      <MyForm country={country} />
    </main>
  );
};

export default FormPage;

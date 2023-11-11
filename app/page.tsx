import MyForm from "@/components/my-form";
import React from "react";

const HomePage = async () => {
  return (
    <main className="h-screen w-full bg-slate-100 grid place-items-center">
      <MyForm />
    </main>
  );
};

export default HomePage;

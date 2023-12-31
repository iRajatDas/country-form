"use client";
import React, { FC, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getLocation } from "@/actions/getUserCountry";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const indianSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .nonempty({
        message: "Username is required.",
      }),
    pan: z
      .string()
      .nonempty({
        message: "PAN is required.",
      })
      .regex(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, {
        message: "PAN must be in the format ABCDE1234F",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .nonempty({
        message: "Password is required.",
      }),
    confirmPassword: z.string().nonempty({
      message: "Confirm password is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const otherSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .nonempty({
        message: "Username is required.",
      }),
    ssn: z
      .string()
      .nonempty({
        message: "SSN is required.",
      })
      .regex(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/, {
        message: "SSN must be in the format 123-45-6789",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .nonempty({
        message: "Password is required.",
      }),
    confirmPassword: z.string().nonempty({
      message: "Confirm password is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface FormProps {
  country?: string;
}

const MyForm: FC<FormProps> = () => {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const location = await getLocation();
      setCountry(location.country);
    };

    getData();
  }, []);

  const formSchema = country === "IN" ? indianSchema : otherSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pan: "",
      ssn: "",
      password: "",
      confirmPassword: ``,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <LayoutGroup>
      <Form {...form}>
        <motion.form
          layout
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <Card className="max-w-xl w-full mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AnimatePresence>
                {typeof country === "string" ? (
                  <motion.div
                    className="grid gap-2"
                    // pop in animation
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // pop out animation
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <>
                      {country === "IN" ? (
                        <FormField
                          control={form.control}
                          name="pan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PAN</FormLabel>
                              <FormControl>
                                <Input placeholder="ABCDE1234F" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <FormField
                          control={form.control}
                          name="ssn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SSN</FormLabel>
                              <FormControl>
                                <Input placeholder="123-45-6789" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="*****" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="*****" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={
                  form.formState.isLoading ||
                  form.formState.isSubmitting ||
                  typeof country !== "string"
                }
              >
                Create account
              </Button>
            </CardFooter>
          </Card>
        </motion.form>
      </Form>
    </LayoutGroup>
  );
};

export default MyForm;

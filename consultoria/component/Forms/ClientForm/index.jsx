import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../src/hooks/useFetch";

import { Input } from "../../Input";

import style from "./ClientForm.module.css";

export const ClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const { postData } = useFetch();

  console.log(errors);

  const onSubmit = (data) => {
    postData("clien", data);
    console.log(data);
    console.log(errors);
  };

  return (
    <>
      <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", {
            required: "Campo obrigatório",
            minLength: { value: 3, message: "Digite ao menos 3 caracteres" },
          })}
          label="Nome"
          placeholder="Nome Completo"
          error={errors.name?.message}
        />
        <Input
          {...register("cpf", {
            required: "Campo obrigatório",
            maxLength: { value: 11, message: "Digite apenas numeros" },
          })}
          label="CPF:"
          placeholder="CPF"
          error={errors.cpf?.message}
        />
        <Input
          {...register("email", {
            required: "Campo obrigarório",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email inválido",
            },
          })}
          label="Email"
          placeholder="E-mail"
          error={errors.email?.message}
        />
        <Input
          {...register("phone", { required: "Campo obrigatório" })}
          label="Telefone:"
          placeholder="Telefone"
          error={errors.phone?.message}
        />
        <div className={style.buttons}>
          <button
            className={style.button1}
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
          <button className={style.button2} type="reset">
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

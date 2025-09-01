import TextField from "../form/TextField.jsx";
import SubmitBtn from "../form/SubmitBtn.jsx";
import { FormProvider, useForm } from "react-hook-form";
import { loginRequest } from "../../api/userApi.js";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginForm({ handleSubmit }) {
  const methods = useForm({ mode: 'onChange', resolver: yupResolver(loginRequest)});
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <TextField name="username" label="Username" />
        <TextField name="password" label="Password" />
        <SubmitBtn>Login</SubmitBtn>
      </form>
    </FormProvider>
  );
}

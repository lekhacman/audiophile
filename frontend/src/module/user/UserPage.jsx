import { useNavigate, useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUser, update, updateUserRequest } from "../../api/userApi.js";
import TextField from "../form/TextField.jsx";
import SubmitBtn from "../form/SubmitBtn.jsx";
import Page from "../layout/Page.jsx";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm({ mode: 'onChange', resolver: yupResolver(updateUserRequest) });
  function handleSubmit(user) {
    return update({ ...user, username: id }).then(() => navigate("/admin"));
  }
  return (
    <Page>
      <div>
        <h1>User {id}</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <TextField name="password" label="Password" />
            <SubmitBtn>Update</SubmitBtn>
          </form>
        </FormProvider>
      </div>
    </Page>
  );
}
UserPage.loader = function UserPageLoader({ params: { id } }) {
  return getUser(id);
};

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { create, createUserRequest, USER_ROLE } from "../../api/userApi.js";
import SubmitBtn from "../form/SubmitBtn.jsx";
import TextField from "../form/TextField.jsx";
import DropdownField from "../form/DropdownField.jsx";
import { useNavigate } from "react-router";
import Page from "../layout/Page.jsx";

export default function CreateUserPage() {
  const methods = useForm({
    defaultValues: { role: USER_ROLE.USER },
    resolver: yupResolver(createUserRequest),
  });
  const navigate = useNavigate();
  function handleCreateUser(user) {
    return create(user).then(() => navigate("/admin"));
  }
  return (
    <Page>
      <div>
        <h1>Create a new user</h1>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleCreateUser)}>
              <TextField name="username" label="Username" />
              <TextField name="password" label="Password" />
              <DropdownField
                name="role"
                label="Role"
                options={Object.values(USER_ROLE).map((role) => ({
                  value: role,
                  label: role,
                }))}
              />
              <SubmitBtn>Create</SubmitBtn>
            </form>
          </FormProvider>
        </div>
      </div>
    </Page>
  );
}

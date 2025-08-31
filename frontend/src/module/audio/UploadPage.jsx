import { FormProvider, useForm } from "react-hook-form";
import SubmitBtn from "../form/SubmitBtn.jsx";
import { upload } from "../../api/assetApi.js";
import { head } from "ramda";
import { useNavigate } from "react-router";
import Page from "../layout/Page.jsx";
import TextField from "../form/TextField.jsx";
import DropdownField from "../form/DropdownField.jsx";
import { useState } from "react";

const audioCategory = [
  { value: "music", label: "Music" },
  { value: "recording", label: "Recording" },
];

export default function UploadPage() {
  const [err, setError] = useState(null);
  const methods = useForm();
  const navigate = useNavigate();
  function handleUpload(dto) {
    if (!dto.myfile.length) {
      return;
    }
    const myfile = head(dto.myfile);
    if (myfile.size > 45e6) {
      setError("Max file size is 45MB.");
    }
    return upload({ ...dto, myfile }).then(() => navigate("/dashboard"));
  }
  return (
    <Page>
      <div>
        <h1>Upload audio</h1>
        <section>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleUpload)}>
              <TextField name="description" label="Description" />
              <DropdownField
                name="category"
                label="Category"
                options={audioCategory}
              />
              <input
                type="file"
                name="myfile"
                accept="audio/*"
                {...methods.register("myfile")}
              />
              <p>{err}</p>
              <SubmitBtn>Upload</SubmitBtn>
            </form>
          </FormProvider>
        </section>
      </div>
    </Page>
  );
}

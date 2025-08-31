import { useFormContext } from "react-hook-form";
import Field from "./Field.jsx";

export default function TextField(props) {
  const { register } = useFormContext();

  return (
    <Field {...props}>
      <input id={name} type="text" {...register(props.name)} />
    </Field>
  );
}

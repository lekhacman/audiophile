import { useFormContext } from "react-hook-form";
import Field from "./Field.jsx";

export default function DropdownField(props) {
  const { register } = useFormContext();
  const { name } = props;
  return (
    <Field {...props}>
      <select name={name} id={name} {...register(name)}>
        {props.options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </Field>
  );
}

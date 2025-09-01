import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
export default function Field({ name, label, children }) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {children}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({message}) => <p style={{color: 'crimson'}}>{message}</p>}
      />
    </div>
  );
}

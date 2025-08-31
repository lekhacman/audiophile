import { useFormContext } from "react-hook-form";

export default function SubmitBtn({ children }) {
  const {
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext();

  return (
    <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
      {children}
    </button>
  );
}

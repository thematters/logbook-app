import { FieldHookConfig, useField } from "formik";
import styles from "./styles.module.css";

type FieldProps = {
  label: string | React.ReactNode;
  as: "input" | "textarea";
  hint?: string | React.ReactNode;
} & FieldHookConfig<string>;

const Field: React.FC<FieldProps> = ({ label, as, hint, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <section className={styles.field}>
      <header>
        <label htmlFor={props.id || props.name} className={styles.label}>
          {label}
        </label>
      </header>

      {as === "input" ? (
        <input {...field} {...(props as JSX.IntrinsicElements["input"])} />
      ) : as === "textarea" ? (
        <textarea
          {...field}
          {...(props as JSX.IntrinsicElements["textarea"])}
        />
      ) : null}

      {hint && !meta.error && <div className={styles.hint}>{hint}</div>}
      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </section>
  );
};

export default Field;

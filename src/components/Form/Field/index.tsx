import { FieldHookConfig, useField } from "formik";
import styles from "./styles.module.css";

import { IconExclaim, TextIcon } from "~/components";

type FieldProps = {
  label?: string | React.ReactNode;
  as: "input" | "textarea";
  hint?: string | React.ReactNode;
  error?: string | React.ReactNode;
} & FieldHookConfig<string>;

const Field: React.FC<FieldProps> = ({ label, as, hint, error, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <section className={styles.field}>
      <header>
        {label && (
          <label htmlFor={props.id || props.name} className={styles.label}>
            {label}
          </label>
        )}
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
      {error && (
        <div className={styles.error}>
          <IconExclaim />
          <TextIcon>{error}</TextIcon>
        </div>
      )}
    </section>
  );
};

export default Field;

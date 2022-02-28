import { Form as FormikForm } from "formik";
import Field from "./Field";

import styles from "./styles.module.css";

/**
 * Usage:
 *
 * import { Formik } from "formik";
 * import Form from "~/Form";
 *
 * <Formik initialValues={} onSubmit={} validationSchema={}>
 *   <Form>
 *     <Form.Field name="firstName" type="text" label="First Name" />
 *     <Form.FIeld name="email" type="email" label="Email" />
 *   </Form>
 * </Formik>
 */

export const Form: React.FC & {
  Field: typeof Field;
} = ({ children }) => (
  <div className={styles.form}>
    <FormikForm>{children}</FormikForm>
  </div>
);

Form.Field = Field;

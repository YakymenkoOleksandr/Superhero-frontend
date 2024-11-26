import css from "./Auth.module.css";
import { Formik, Form, Field } from "formik";

export default function Auth() {
  return (
    <div>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form className={css.form}>
          <Field className={css.field} type="text" name="username" />
          <Field className={css.field} type="email" name="email" />
          <Field className={css.field} type="text" name="password" />
          <button className={css.btn}  type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

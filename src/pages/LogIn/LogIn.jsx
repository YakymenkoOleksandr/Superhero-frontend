import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../redux/auth/authOperations";
import {
  selectAuthStatus,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import { useNavigate } from "react-router-dom";
import css from "./LogIn.module.css";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min 8 characters")
    .matches(/.*[a-z].*/, "Must include at least one lowercase letter")
    .matches(/.*[A-Z].*/, "Must include at least one uppercase letter")
    .matches(/.*\d.*/, "Must include at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character"
    ),
});

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/superherosColection");
    }
  };

  return (
    <div className={css.backgroungImg}>
      <Formik
        initialValues={initialValues}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label htmlFor="email">Email</label>
          <Field className={css.field} type="email" name="email" />
          <ErrorMessage name="email" component="span" className={css.error} />
          <label htmlFor="password">Password</label>
          <Field className={css.field} type="password" name="password" />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
          <button
            className={css.btn}
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Submit"}
          </button>
        </Form>
      </Formik>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
}

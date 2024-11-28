import css from "./Auth.module.css";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const BASE_URL = "https://superhero-backend-vrcc.onrender.com";
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      console.log("Registering user with data:", userData); // Перед відправкою запиту
      const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
        headers: { "Content-Type": "application/json" }, // Вказуємо формат даних
      });
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      console.error("Full error details:", error);
      throw error;
    }
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "You need to use min 8 symbols")
      .matches(RegExp("(.*[a-z].*)"), "You need to use min 1 lowercase!")
      .matches(RegExp("(.*[A-Z].*)"), "You need to use min 1 uppercase!")
      .matches(RegExp("(.*\\d.*)"), "You need to use  min 1 number!")
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        'You need to use min 1 symbol [!@#$%^&*(),.?":{}|<>]'
      ),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      console.log("Submitting values:", values); // Логування вхідних даних
      const response = await registerUser(values); // Передаємо значення у функцію
      alert("Registration successful!");
      console.log("Server response:", response); // Логування відповіді сервера
      actions.resetForm();
      navigate("/login"); // Перехід на сторінку логіну
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      console.error("Registration error:", error); // Логування помилки
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={css.error}
          />
          <label htmlFor={emailFieldId}>Email</label>
          <Field
            className={css.field}
            type="email"
            name="email"
            id={emailFieldId}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
          <label htmlFor={passwordFieldId}>Password</label>
          <Field
            className={css.field}
            type="password"
            name="password"
            id={passwordFieldId}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
          <button className={css.btn} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

import css from "./LogIn.module.css";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/authSlice.js";

export default function LogIn() {
  const dispatch = useDispatch();
  const BASE_URL = "https://superhero-backend-vrcc.onrender.com";
  const navigate = useNavigate();

  const loginUser = async (userData) => {
    try {
      console.log("Logining user with data:", userData); 
      const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
        headers: { "Content-Type": "application/json" }, 
      });
      console.log("Logining successful:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error during logining:",
        error.response?.data || error.message
      );
      console.error("Full error details:", error);
      throw error;
    }
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const FeedbackSchema = Yup.object().shape({
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
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      console.log("Submitting values:", values); 
      const response = await loginUser(values);
       // Збереження токена у Redux Store
      dispatch(setAccessToken(response.data.accessToken));
      alert("Logining successful!");
      console.log("Server response:", response); 
      actions.resetForm();
      navigate("/superherosColection"); 
    } catch (error) {
      alert(error.response?.data?.message || "Logining failed");
      console.error("Logining error:", error); 
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

import { Formik, Form, Field } from "formik";
import { useId } from "react";
import css from "./AddSuperhero.module.css";

function AddSuperhero() {
  const nicknameId = useId();
  const realNameId = useId();
  const originDescriptionId = useId();
  const superpowersId = useId();
  const catchPhraseId = useId();
  const imageUploadId = useId();

  const initialValues = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    image: "",
  };

  const handleSubmit = async (values, actions) => {
    const { image, ...rest } = values;

    let imageUrl = "";
    if (image) {
      // Створення FormData для завантаження зображення
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_upload_preset"); // Замініть на ваш preset

      // Запит до сервера для завантаження зображення
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await uploadResponse.json();
      imageUrl = uploadData.secure_url; // Отримати URL зображення
    }

    // Створення нової картки супергероя
    const superheroData = {
      ...rest,
      images: [imageUrl], // Додаємо URL зображення
    };

    try {
      const response = await fetch(
        "https://superhero-backend-vrcc.onrender.com/superheros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(superheroData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Ваша логіка для обробки успішного запиту
      console.log("Superhero created successfully:", superheroData);
      actions.resetForm();
    } catch (error) {
      console.error("Failed to create superhero:", error);
    }
  };

  return (
    <div className={css.backgroundForm}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.wrapperForm}>
          <label htmlFor={nicknameId}>Nickname</label>
          <Field type="text" name="nickname" />
          <label htmlFor={realNameId}>Real name</label>
          <Field type="text" name="real_name" />
          <label htmlFor={originDescriptionId}>Origin description</label>
          <Field
            type="text"
            as="textarea"
            cols="20"
            rows="5"
            name="origin_description"
          />
          <label htmlFor={superpowersId}>Superpowers</label>
          <Field
            type="text"
            as="textarea"
            cols="20"
            rows="5"
            name="superpowers"
          />
          <label htmlFor={catchPhraseId}>Catch phrase</label>
          <Field
            type="text"
            as="textarea"
            cols="20"
            rows="5"
            name="catch_phrase"
          />
          <label htmlFor={imageUploadId}>Upload Image</label>
          <Field type="file" name="image" id={imageUploadId} />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddSuperhero;

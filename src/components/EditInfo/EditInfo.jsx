import { useState } from "react";
import css from "./EditInfo.module.css";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuperHeroes } from "../../redux/heroes/heroesOperations";
import { updateHeroInfo } from "../../redux/heroes/heroesOperations.js"
import { selectAccessToken } from "../../redux/auth/authSelectors.js"

function EditInfo({ hero, currentPage }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const nicknameId = useId();
  const realNameId = useId();
  const originDescriptionId = useId();
  const superpowersId = useId();
  const catchPhraseId = useId();

  const accessToken = useSelector(selectAccessToken);

  const initialValues = {
    nickname: hero.nickname || "",
    real_name: hero.real_name || "",
    origin_description: hero.origin_description || "",
    superpowers: hero.superpowers,
    catch_phrase: hero.catch_phrase || "",
  };

 
 const handleSubmit = async (values, actions) => {
  setSuccessMessage("");
  setErrorMessage("");

  const { superpowers, ...rest } = values;

  /*const superpowersArray = superpowers
    .split(",")
    .map((power) => power.trim())
    .filter((power) => power);*/

  const superheroData = {
    ...rest,
    superpowers: superpowers, //superpowersArray
  };

   try {
    await dispatch(updateHeroInfo(hero._id, superheroData, accessToken));
    actions.resetForm();
    setSuccessMessage("Superhero information updated successfully!");
    dispatch(fetchSuperHeroes(currentPage, accessToken)); 
    closeEditModal();
  } catch (error) {
    console.error("Failed to update superhero:", error);
    setErrorMessage("Failed to update superhero information.");
  }
};

  return (
    <div>
      <button className={css.editInfoButton} onClick={openEditModal}>
        Edit Info
      </button>

      {isEditModalOpen && (
        <div className={css.modalOverlay} onClick={closeEditModal}>
          <div
            className={css.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={css.backgroundForm}>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className={css.wrapperForm}>
                  <label htmlFor={nicknameId}>Nickname</label>
                  <Field
                    type="text"
                    name="nickname"
                    className={css.field}
                    placeholder="Change a nickname (Not Required)"
                  />
                  <label htmlFor={realNameId}>Real name</label>
                  <Field
                    type="text"
                    name="real_name"
                    className={css.field}
                    placeholder="Change a real name (Not Required)"
                  />
                  <label htmlFor={originDescriptionId}>
                    Origin description
                  </label>
                  <Field
                    type="text"
                    as="textarea"
                    cols="20"
                    rows="3"
                    name="origin_description"
                    className={css.field}
                    placeholder="Enter a description of the origin (Not Required)"
                  />
                  <label htmlFor={superpowersId}>Superpowers</label>
                  <Field
                    type="text"
                    as="textarea"
                    cols="20"
                    rows="3"
                    name="superpowers"
                    className={css.field}
                    placeholder="Enter superpowers separated by comma and space (Not Required)"
                  />
                  <label htmlFor={catchPhraseId}>Catch phrase</label>
                  <Field
                    type="text"
                    as="textarea"
                    cols="20"
                    rows="3"
                    name="catch_phrase"
                    className={css.field}
                    placeholder="Enter a catch phrase (Not Required)"
                  />

                  <button type="submit" className={css.buttonSubmit}>
                    Submit
                  </button>
                </Form>
              </Formik>

              {successMessage && (
                <div className={css.successMessage}>{successMessage}</div>
              )}
              {errorMessage && (
                <div className={css.errorMessage}>{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditInfo;

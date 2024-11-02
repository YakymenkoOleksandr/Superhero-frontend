import css from "./DeleteImageButton.module.css";
import { MdDelete } from "react-icons/md";

function DeleteImageButton({ index, hero }) {
    console.log(index);
    
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch(`https://superhero-backend-vrcc.onrender.com/api/superheros/${hero._id}/images/${index}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting image:", errorData);
          throw new Error(`Error deleting image: ${response.status}`);
          }
          
          console.log(`Image at index ${index} deleted successfully.`);
          
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
  };

  return (
    <div className={css.deleteWrapperIcon} onClick={handleDelete}>
          <MdDelete className={css.deleteIcon} />
    </div>
  );
}

export default DeleteImageButton;

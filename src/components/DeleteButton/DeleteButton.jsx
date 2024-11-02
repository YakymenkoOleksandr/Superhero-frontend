import { useState } from 'react';
import css from './DeleteButton.module.css';

function DeleteButton({ hero }) {
    // console.log(hero._id);
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const openConfirmModal = () => setIsConfirmOpen(true);
    const closeConfirmModal = () => setIsConfirmOpen(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://superhero-backend-vrcc.onrender.com/superheros/${hero._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                closeConfirmModal();
            } else {
                console.error('Error deleting superhero');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button className={css.deleteButton} onClick={openConfirmModal}>
                Delete <br />
                hero card
            </button>

            {isConfirmOpen && (
                <div className={css.modalOverlay} onClick={closeConfirmModal}>
                    <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                        <p>Are you sure you want to delete this hero?</p>
                        <button onClick={handleDelete} className={css.confirmButton}>
                            Confirm
                        </button>
                        <button onClick={closeConfirmModal} className={css.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteButton;
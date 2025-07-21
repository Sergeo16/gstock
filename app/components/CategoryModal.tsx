import React, { FC } from 'react';

// Props pour la modale de catégorie
interface CategoryModalProps {
  name: string;
  description: string;
  loading: boolean;
  onclose: () => void;
  onChangeName: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onSubmit: () => void;
  editMode?: boolean;
}

const CategoryModal: FC<CategoryModalProps> = ({
  name,
  description,
  loading,
  onclose,
  onChangeDescription,
  onChangeName,
  editMode,
  onSubmit,
}) => {
  // Empêche le submit par défaut sur le bouton de fermeture
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onclose();
  };

  // Empêche le submit par défaut sur le bouton principal
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <dialog id="category_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
            type="button"
            aria-label="Fermer"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">
          {editMode ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </h3>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={e => onChangeName(e.target.value)}
          className="input input-bordered mb-4 focus:border-none focus:outline-accent w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => onChangeDescription(e.target.value)}
          className="input input-bordered mb-4 focus:border-none focus:outline-accent w-full"
        />
        <button
          className="btn bg-stone text-accent border-accent border-2 hover:border-3"
          onClick={handleSubmit}
          disabled={loading}
          type="button"
        >
          {loading
            ? editMode
              ? 'Modification...'
              : 'Ajout...'
            : editMode
              ? 'Modifier'
              : 'Ajouter'}
        </button>
      </div>
    </dialog>
  );
};

export default CategoryModal;
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ConfirmModal = ({ isOpen, onClose, onDelete, message }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal(); // Abre el modal
    } else {
      dialogRef.current.close(); // Cierra el modal
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onDelete();
    onClose(); // Cerrar el modal después de subir
  };

  return (
    <dialog
      ref={dialogRef}
      className="p-6 bg-white rounded-lg shadow-lg w-96 "
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose(); // Cierra al hacer clic fuera del modal
      }}
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        {message}
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Aceptar
          </button>
        </div>
      </form>
    </dialog>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default ConfirmModal;

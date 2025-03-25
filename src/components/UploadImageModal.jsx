import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { compressFileSelection } from "../utilities";
import { addImageToAlbum, uploadImage } from "../services/services";
import LinearProgress from "@mui/material/LinearProgress";

const UploadImageModal = ({ isOpen, onClose, folderId, onUpload }) => {
  const dialogRef = useRef(null);
  const inputFileRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal(); // Abre el modal
    } else {
      dialogRef.current.close(); // Cierra el modal
      inputFileRef.current.value = ""; // Limpia el input
      setImage(null);
      setImagePreview(null);
    }
  }, [isOpen]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      const compressedFiles = await compressFileSelection(event);
      setImage(compressedFiles);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Subir la imagen a Cloudinary
    setUploading(true);
    const uploadImageResult = await Promise.all(
      image.map((file) => uploadImage(file, folderId))
    );
    const resultAddImage = await addImageToAlbum(folderId, uploadImageResult);

    if (resultAddImage.error) {
      console.error("Error al subir imagen:", resultAddImage);
      return;
    }
    setUploading(false);
    console.log("Imagen subida:", uploadImageResult);
    onUpload(uploadImageResult[0]); // Llamar a la función onUpload con la imagen subida
    setImagePreview(null);
    inputFileRef.current.value = "";
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
        Subir Imagen al album
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={inputFileRef}
          className="w-full border p-2 rounded-lg"
        />

        {/* Previsualización de imagen */}
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Previsualización"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <div>{uploading && <LinearProgress />}</div>
        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          {uploading ? (
            <span>Subiendo...</span>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Subir
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
};

UploadImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  folderId: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default UploadImageModal;

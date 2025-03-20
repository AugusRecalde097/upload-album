import {
  deleteImage,
  listAlbums,
  listPhotosByAlbum,
} from "../services/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import UploadImageModal from "../components/UploadImageModal";
import DeleteImageModal from "../components/DeleteImageModal";

const Album = () => {
  //Rescato el id del album desde la URL con useParams de react-router-dom

  const { idAlbum } = useParams();
  const [images, setImages] = useState([]);
  const [album, setAlbum] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [ imageToDelete, setImageToDelete] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    Promise.all([listAlbums({ idAlbum }), listPhotosByAlbum(idAlbum)])
      .then((res) => {
        const [album, photos] = res;
        const { rows: imagesRow } = photos.data;
        const { rows: albumData } = album.data;

        console.log(albumData);
        setAlbum(albumData[0]);
        setImages(imagesRow);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [idAlbum]);

  const handleDeleteImage = (imageId, imageName) => {
    console.log("Eliminar imagen", { imageId, imageName });
    const resultDelete = deleteImage({ imageId, imageName });
    console.log(resultDelete);
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
  };

  return (
    <>
      <div className=" mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Álbum</h2>
        <div className="gap-4">
          {/* Formulario */}
          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-gray-700 font-medium">Título</label>
              <input
                type="text"
                value={album.title}
                placeholder="Ingrese el título del álbum"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Descripción */}
            <div>
              <label className="block text-gray-700 font-medium">
                Descripción
              </label>
              <textarea
                value={album.description}
                placeholder="Ingrese una descripción"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="3"
              ></textarea>
            </div>
            {/* Botones */}
            <div className="flex justify-between mt-4 gap-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Guardar Cambios
              </button>
            </div>
          </div>
          {/* Galería de imágenes */}
          <div className="mt-6 ">
            <h3 className="text-lg font-medium text-gray-700">
              Imágenes del Álbum
            </h3>
            {/* Botones */}
            <div className="flex justify-between mt-2 gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                <UploadIcon />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "800 / 600" }}
                    sizes={`(max-width:" 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px, 1280px`}
                    height="900"
                    decoding="async"
                    loading="lazy"
                    src={`${image.url}`}
                    alt={image.name}
                  />
                  <button
                    onClick={() => {
                      setConfirmDelete(true)
                      setImageToDelete({ id: image.id, name: image.name });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DeleteImageModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onDelete={() => {
            handleDeleteImage(imageToDelete.id, imageToDelete.name);
          }}
        />
        <UploadImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          folderId={idAlbum}
          onUpload={(image) => {
            setImages((prevImages) => [...prevImages, image]);
          }}
        />
      </div>
    </>
  );
};

export default Album;

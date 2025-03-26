import {
  deleteAlbum,
  deleteImage,
  listAlbums,
  listPhotosByAlbum,
  updateAlbum,
} from "../services/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { Save, Delete } from "@mui/icons-material";
import UploadImageModal from "../components/UploadImageModal";
import DeleteImageModal from "../components/DeleteImageModal";
import { Alert, Snackbar } from "@mui/material";
import ConfirmModal from "../components/ConfirmModal";
import TooltipCustom from "../components/Tooltip";
import TooltipMUI from "@mui/material/Tooltip";

const Album = () => {
  //Rescato el id del album desde la URL con useParams de react-router-dom

  const { idAlbum } = useParams();
  const [images, setImages] = useState([]);
  const [album, setAlbum] = useState({
    title: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteAlbum, setConfirmDeleteAlbum] = useState(false);
  const [thumbnail, setThumbnail] = useState(null); // Miniatura seleccionada
  const [imageToDelete, setImageToDelete] = useState({
    id: null,
    name: null,
  });

  const [alertOpen, setAlertOpen] = useState({
    open: false,
    message: "Hello World!",
    severity: "error",
  });

  useEffect(() => {
    Promise.all([listAlbums({ idAlbum }), listPhotosByAlbum(idAlbum)])
      .then((res) => {
        const [album, photos] = res;
        const { rows: imagesRow } = photos.data;
        const { rows: albumData } = album.data;

        console.log(imagesRow);
        setAlbum(albumData[0]);
        setImages(imagesRow);
        setThumbnail(albumData[0].thumbnail);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [idAlbum]);

  const handleDeleteImage = async (imageId, imageName) => {
    const resultDelete = await deleteImage({ imageId, imageName });
    console.log(resultDelete);
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
  };

  const handleDeleteAlbum = ({ id }) => {
    deleteAlbum({ idAlbum: id })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showAlert({
            message: `Error al eliminar el álbum. ${data.msg}`,
            severity: "error",
          });
          return;
        }
        showAlert({
          message: "Álbum eliminado con éxito!",
          severity: "success",
        });
        //  handleNavigation("/");
      });
  };

  const handleSetThumbnail = (image) => setThumbnail(image.name); // Establecer miniatura

  const showAlert = (newState) => {
    setAlertOpen({ ...newState, open: true });
  };

  const handleClose = () => {
    setAlertOpen({ ...alertOpen, open: false });
  };

  const handleSaveAlbum = async () => {
    if (!album.title || !thumbnail || !album.description) {
      showAlert({
        message: "Por favor, completa todos los campos.",
        severity: "error",
      });
      return;
    }

    const albumData = {
      id: idAlbum, // ID del álbum
      title: album.title,
      description: album.description,
      thumbnail: thumbnail, // ID de la miniatura seleccionada
    };

    const addAlbum = await updateAlbum({ albumData });

    if (addAlbum?.error) {
      showAlert({
        message: "Error al guardar el álbum.",
        severity: "error",
      });
      return;
    }
    // Aquí puedes enviar albumData a tu servidor o base de datos para guardar
    showAlert({
      message: "Álbum actualizado con éxito!",
      severity: "success",
    });
    // handleNavigation("/");
  };

  return (
    <>
      <div className=" mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Álbum</h2>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={alertOpen?.open}
          autoHideDuration={5000}
        >
          <Alert
            onClose={handleClose}
            severity={alertOpen.severity} // 'success' | 'info' | 'warning' | 'error'
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertOpen.message}
          </Alert>
        </Snackbar>
        <div className="gap-4">
          {/* Formulario */}
          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-gray-700 font-medium">Título</label>
              <input
                type="text"
                value={album.title}
                onChange={(e) => setAlbum({ ...album, title: e.target.value })}
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
                onChange={(e) =>
                  setAlbum({ ...album, description: e.target.value })
                }
                placeholder="Ingrese una descripción"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="3"
              ></textarea>
            </div>
            {/* Botones */}
            <div className="flex  mt-4 gap-3">
              <TooltipCustom text="Guardar">
                <button
                  onClick={handleSaveAlbum}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-green-500 transition"
                >
                  <Save />
                </button>
              </TooltipCustom>
              <TooltipCustom text="Eliminar">
                <button
                  onClick={() => handleDeleteAlbum({ id: idAlbum })}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-red-500 transition"
                >
                  <Delete />
                </button>
              </TooltipCustom>
              <TooltipCustom text="Subir Imagen">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                >
                  <UploadIcon />
                </button>
              </TooltipCustom>
            </div>
          </div>
          {/* Galería de imágenes */}
          <div className="mt-6 ">
            <h3 className="text-lg font-medium text-gray-700">
              Imágenes del Álbum
            </h3>
            {/* Botones */}
            <div className="flex justify-between mt-2 gap-3"></div>
            <div className="grid grid-cols-3 gap-4 mt-3">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <TooltipMUI title="Seleccionar como miniatura" followCursor>
                  <img
                    className={`h-full w-full object-cover cursor-pointer rounded-md ${
                      thumbnail === image.name
                        ? "border-4 border-blue-500"
                        : "border"
                    }`} // Establecer borde azul si es la miniatura seleccionada
                    style={{ aspectRatio: "800 / 600" }}
                    sizes={`(max-width:" 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px, 1280px`}
                    height="900"
                    decoding="async"
                    loading="lazy"
                    src={`${image.url}`}
                    alt={image.name}
                    onClick={() => handleSetThumbnail(image)} // Establecer miniatura al hacer clic
                  />
                  </TooltipMUI>
                  <TooltipCustom text="Eliminar">
                    <button
                      onClick={() => {
                        setConfirmDelete(true);
                        setImageToDelete({ id: image.id, name: image.name });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                    >
                      <DeleteIcon />
                    </button>
                  </TooltipCustom>
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
        <ConfirmModal
          isOpen={confirmDeleteAlbum}
          onClose={() => setConfirmDeleteAlbum(false)}
          onDelete={() => {
            handleDeleteAlbum({ id: idAlbum });
          }}
        ></ConfirmModal>
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

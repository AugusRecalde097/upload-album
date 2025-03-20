import { useEffect, useState } from "react";
import { uploadAlbum, uploadImage } from "../services/services"; // Importa la función de subida de imágenes
import { compressFileSelection } from "../utilities"; // Importa la función de selección de archivos
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { useNavigate } from "react-router-dom";

const UploadAlbumImages = () => {
  const [albumName, setAlbumName] = useState(""); // Nombre del álbum
  const [folderName, setFolderName] = useState(""); // Nombre de la carpeta
  const [selectedFiles, setSelectedFiles] = useState([]); // Imágenes seleccionadas
  const [images, setImages] = useState([]); // Imágenes subidas
  const [thumbnail, setThumbnail] = useState(null); // Miniatura seleccionada
  const [albumDescription, setAlbumDescription] = useState(""); // Descripción del álbum
  const [cantidadImages, setCantidadImages] = useState(0);

  const [showButton, setShowButton] = useState(false);


  useEffect(() => {
    console.log(cantidadImages);  
  }, [cantidadImages]);


  // const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState({
    open: false,
    message: "Hello World!",
    severity: "error",
  });

  // const handleNavigation = url => navigate(url);

  const showAlert = (newState) => {
    setAlertOpen({ ...newState, open: true });
  };

  const handleClose = () => {
    setAlertOpen({ ...alertOpen, open: false });
  };

  // Funciones para actualizar los estados
  const handleAlbumNameChange = (e) => setAlbumName(e.target.value);
  const handleFolderNameChange = (e) => setFolderName(e.target.value);
  const handleAlbumDescriptionChange = (e) =>
    setAlbumDescription(e.target.value);

  const uploadImagesToCloudinary = async () => {
    if (!albumName || !albumDescription || !folderName) {
      showAlert({
        message: "Por favor, completa todos los campos.",
        severity: "error",
      });
      return;
    }
    if (!selectedFiles.length) {
      showAlert({
        message: "Por favor, seleccione imagenes para subir album.",
        severity: "error",
      });
      return;
    }
    const uploadedImages = await Promise.all(
      selectedFiles.map((file) => uploadImage(file, folderName))
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]); // Guardar las imágenes subidas
    setShowButton(true);
    setSelectedFiles([]); // Limpiar la selección de archivos después de la carga
  };

  const handleSetThumbnail = (image) => setThumbnail(image.id); // Establecer miniatura

  const handleClearImages = () => {
    setImages([]);
    setThumbnail(null);
    setSelectedFiles([]);
    setCantidadImages(0);
    setShowButton(false);
  };

  const handleDeleteImage = (imageId) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
    if (thumbnail === imageId) setThumbnail(null);
  };

  const handleSaveAlbum = async () => {
    if (!albumName || !thumbnail || !albumDescription) {
      showAlert({
        message: "Por favor, completa todos los campos.",
        severity: "error",
      });
      return;
    }

    const albumData = {
      title: albumName,
      description: albumDescription,
      thumbnail: thumbnail, // ID de la miniatura seleccionada
      images: images, // Todas las imágenes subidas
    };

    const addAlbum = await uploadAlbum(albumData);

    if (addAlbum?.error) {
      showAlert({
        message: "Error al guardar el álbum.",
        severity: "error",
      });
      return;
    }
    // Aquí puedes enviar albumData a tu servidor o base de datos para guardar
    showAlert({
      message: "Álbum guardado con éxito!",
      severity: "success",
    });
    // handleNavigation("/");
  };

  const handleFileSelection = async (e) => {

    const compressedFiles = await compressFileSelection(e);
    setSelectedFiles(compressedFiles); // Guardamos las imágenes comprimidas
    console.log(e.target.files);
    setCantidadImages(e.target.files.length);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Subida de imágenes
      </h2>
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
      <div className="space-y-4">
        {/* Nombre del álbum */}
        <div>
          <label className="block text-gray-700 font-medium">
            Nombre de álbum
          </label>
          <input
            type="text"
            placeholder="Enter album name"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={albumName} // Valor del estado
            onChange={handleAlbumNameChange} // Actualización del estado
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-gray-700 font-medium">
            Descripción del álbum
          </label>
          <textarea
            placeholder="Enter album description"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            value={albumDescription} // Valor del estado
            onChange={handleAlbumDescriptionChange} // Actualización del estado
          ></textarea>
        </div>

        {/* Nombre de carpeta */}
        <div>
          <label className="block text-gray-700 font-medium">
            Nombre de Carpeta
          </label>
          <input
            type="text"
            placeholder="Enter folder name"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={folderName} // Valor del estado
            onChange={handleFolderNameChange} // Actualización del estado
          />
        </div>

        {/* Selección de imágenes */}
        <div className="mb-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelection} // Actualización de las imágenes seleccionadas
              className="hidden"
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className="cursor-pointer text-center">
              <p className="text-gray-600">
                {cantidadImages > 0 ? (
                  `Imagenes seleccionadas: ${cantidadImages}`
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">📷</span>
                    <span className="mt-2 text-sm text-gray-600">
                      Agregar imagenes
                    </span>
                  </div>
                )}
              </p>
            </label>
          </div>
        </div>

        {/* Visualización de imágenes subidas */}
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.name}
                className={`object-cover w-full h-24 rounded-md cursor-pointer ${
                  thumbnail === image.id ? "border-4 border-blue-500" : "border"
                }`}
                onClick={() => handleSetThumbnail(image)} // Establecer miniatura al hacer clic
              />
              <button
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white text-xs rounded-full opacity-75 hover:opacity-100"
              >
                ✕
              </button>
              <p className="text-xs mt-1 text-center truncate">{image.name}</p>
              <p className="text-xs text-center">
                {image.width} x {image.height}
              </p>
            </div>
          ))}
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleClearImages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Limpiar
          </button>
          <div className="flex space-x-3">
            {showButton ? (
              <button
                onClick={handleSaveAlbum} // Guardar los datos del álbum
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Guardar álbum
              </button>
            ) : null}
            <button
              onClick={uploadImagesToCloudinary}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Subir imágenes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAlbumImages;

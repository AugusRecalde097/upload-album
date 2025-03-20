import { ENV } from "../../config";

const cloudName = ENV.CLOUD_NAME;
const uploadPreset = ENV.UPLOAD_PRESET;

/** Sube las imágenes seleccionadas a Cloudinary */
export const uploadImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    if (folder) {
      formData.append("folder", folder);
    }

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({
          id: data.public_id,
          url: data.secure_url,
          name: file.name,
          width: data.width,
          height: data.height,
        });
      })
      .catch((error) => {
        console.error("Error uploading to Cloudinary:", error);
        reject(error);
      });
  });
};

export const uploadAlbum = async ({
  title,
  description,
  thumbnail, // ID de la miniatura seleccionada
  images, // Todas las imágenes subidas
}) => {
  const resultService = await fetch(
    "http://localhost:3005/api/v1/admin/albums",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        thumbnail, // ID de la miniatura seleccionada
        images, // Todas las imágenes subidas
      }),
    }
  );
  const result = await resultService.json();
  return result;
};

export const addImageToAlbum = async (idAlbum, images) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      porfolio_id: idAlbum,
      images,
    }),
  };

  const resultService = await fetch(
    "http://localhost:3005/api/v1/admin/photo",
    options
  );

  return resultService;
};

export const deleteImage = async ({ imageId, imageName }) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: imageId,
      name: imageName,
    }),
  };

  const resultService = await fetch(
    `http://localhost:3005/api/v1/admin/photo`,
    options
  );

  return resultService;
};

export const listAlbums = async ({ idAlbum = 0 }) => {
  const resultService = await fetch(
    `http://localhost:3005/api/v1/admin/albums?id=${idAlbum}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await resultService.json();
  return result;
};

export const listPhotosByAlbum = async (idAlbum) => {
  const resultService = await fetch(
    `http://localhost:3005/api/v1/admin/albums/${idAlbum}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await resultService.json();
  return result;
};

import imageCompression from 'browser-image-compression'; // Importa la librería

export const compressFileSelection = async (e) => {
  const files = Array.from(e.target.files);

  try {
    // Comprimir las imágenes antes de subirlas
    const compressedFiles = await Promise.all(
      files.map((file) =>
        imageCompression(file, {
          maxSizeMB: 10, // Tamaño máximo en MB
          maxWidthOrHeight: 1920, // Ancho o alto máximo
          useWebWorker: true, // Mejor rendimiento
        })
      )
    );
    // console.log(compressedFiles);
    // setSelectedFiles(compressedFiles); // Guardamos las imágenes comprimidas
    return compressedFiles;
  } catch (error) {
    console.error('Error durante la compresión de imágenes:', error);
    alert('Hubo un problema al comprimir las imágenes.');
  }
};

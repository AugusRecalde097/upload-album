import { useEffect, useState } from "react";
import { listAlbums } from "../services/services";
import ImageCard from "../components/ImageCard";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const handleNavigation = (url) => {
    navigate(url);
  };
  useEffect(() => {
    Promise.all([listAlbums({})])
      .then((res) => {
        const [albums] = res;
        const { rows } = albums.data;
        setAlbums(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
        <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Galería de Imágenes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {albums
          ? albums.map((album) => {
              return (
                <section key={album.id} onClick={ () => handleNavigation(`/album/${album.id}`)} className="cursor-pointer">
                <ImageCard
                  key={album.id}
                  imageUrl={album.url}
                  title={album.title}
                  description={album.description}
                />
                </section>
              );
            })
          : null}
      </div>
    </section>
    </>
  );
};

export default Home;

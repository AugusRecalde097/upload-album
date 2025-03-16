import { useNavigate, Outlet } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <button
                className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => handleNavigation("/")}
              >
                Inicio
              </button>
              <button
                className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => handleNavigation("/upload")}
              >
                Subir fotos
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl leading-6 font-bold text-gray-900">
               Alina Fotografía
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Administrador de fotos para la galería online
              </p>
            </div>
            <div className="border-t border-gray-200 py-3">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

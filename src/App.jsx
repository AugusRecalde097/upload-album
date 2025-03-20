import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadAlbumImages from "./pages/UploadAlbumImages";
import Home from "./pages/Home";
import { Layout } from "./layout/layout";
import Album from "./pages/Album";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={ <Layout /> } >
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadAlbumImages />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/album/:idAlbum" element={<Album />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

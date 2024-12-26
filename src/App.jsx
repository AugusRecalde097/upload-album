import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadAlbumImages from "./pages/UploadAlbumImages";
import Home from "./pages/Home";

function App() {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <UploadAlbumImages />
    // </div>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadAlbumImages />} />
    </Routes>
  </Router>
  );
}

export default App;

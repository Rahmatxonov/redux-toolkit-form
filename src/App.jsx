import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreatePage, NotFoundPage } from "./pages";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePage />} />
      {/* <Route path="/update/:id" element={<UpdatePage />} /> */}
      {/* <Route path="/delete" element={<DeletePage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

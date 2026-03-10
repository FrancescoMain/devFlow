import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Da Implementare</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Formulario from "./componentes/Formulario";
import "./App.css";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Formulario />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;

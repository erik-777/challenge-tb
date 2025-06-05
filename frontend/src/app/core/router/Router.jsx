import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Main from "../Layouts/main";
import File from "../../pages/files/File";

export default function PublicRouter() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route path="/" element={<File />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

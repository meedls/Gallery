import { useState } from "react";
import MainPage from "./pages/MainPage/MainPage";
import SwaggerPage from "./pages/SwaggerPage/SwaggerPage";

function App() {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <>
      {showDocs ? <SwaggerPage /> : <MainPage />}
    </>
  );
}

export default App;
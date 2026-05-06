import { useState } from "react";
import MainPage from "./pages/MainPage/MainPage";
import SwaggerPage from "./pages/SwaggerPage/SwaggerPage";

function App() {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDocs(!showDocs)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9999
        }}
      >
        {showDocs ? "Назад" : "Swagger"}
      </button>

      {showDocs ? <SwaggerPage /> : <MainPage />}
    </>
  );
}

export default App;
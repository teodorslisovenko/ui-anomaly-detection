import React from "react";
import Upload from "../upload-component/upload";

function Home() {
  return (
    <>
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <h1 id="main_text">UI-anomaly-detection</h1>
        <Upload />
      </div>
    </>
  );
}

export default Home;

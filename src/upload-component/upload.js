import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { anomalySchema } from "../schemas/anomaly-schema";
import { validate } from "jsonschema";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import styled from "styled-components";

function Upload() {
  const [anomalies, setAnomalies] = useState([]);
  const [validUpload, setValidUpload] = useState(false);
  let files = null;

  const onDrop = useCallback((acceptedFiles) => {
    setAnomalies([]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {
        const json = JSON.parse(new TextDecoder().decode(reader.result));
        const validationResults = validate(json, anomalySchema);

        if (validationResults.valid === false) {
          setAnomalies((oldArray) => [...oldArray, "error"]);
          // validationResults.errors is providing error message.
        } else {
          setAnomalies((oldArray) => [...oldArray, json]);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ onDrop, accept: "application/json" });

  useEffect(() => {
    if (anomalies.length !== 0) {
      if (anomalies.includes("error")) {
        setValidUpload(false);
        Swal.fire({
          icon: "error",
          title: "Your uploaded JSON file(-s) is not valid by schema",
          text: `Please try again with JSON files, that have correct format.`,
        });
      } else {
        setValidUpload(true);
        Swal.fire({
          icon: "success",
          title: "Uploaded files are valid",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(anomalies);
    }
  }, [anomalies, validUpload]);

  if (validUpload) {
    files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  }

  return (
    <>
      <Container
        className="col-4 d-flex justify-content-center text-center"
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <h3 className="text-white">
          Drag 'n' drop JSON files here, or click to select files...{" "}
        </h3>
      </Container>
      <aside className="text-start">
        <h3 id="main_text" className="p-3 text-center">
          <Link to={{ pathname: "/anomalies", state: { anomalies: null } }}>
            I do not have any files and use streams as data provider
            <br />
            (Click this link)
          </Link>
        </h3>
        <h1 className="display-6 p-3">Your uploaded files:</h1>
        <ul>
          <h4>{files}</h4>
        </ul>
      </aside>

      {validUpload ? <GoToMap data={anomalies} /> : null}
    </>
  );
}

const GoToMap = ({ data }) => (
  <>
    <Link to={{ pathname: "/anomalies", state: { anomalies: data } }}>
      <button
        className="btn btn-dark"
        type="button"
        style={{ height: "100%", width: "450px" }}
      >
        <h4>Display anomalies</h4>
      </button>
    </Link>
  </>
);

export default Upload;

// CSS styling

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#rgba(0, 0, 0, 0.4)";
};

const Container = styled.div`
  width: 70%;
  height: 40%;
  align-items: center;
  padding: 20px;
  border-width: 7px;
  border-radius: 7px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background: rgba(0, 0, 0, 0.4);
  outline: none;
  transition: border 0.24s ease-in-out;
`;

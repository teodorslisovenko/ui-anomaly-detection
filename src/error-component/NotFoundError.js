import React from "react";
import { Link } from "react-router-dom";

function NotFoundError() {
  return (
    <>
      <div className="container py-4">
        <div className="p-5 mb-4 text-white bg-transparent">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">You landed on a wrong page.</h1>
            <p className="col-md-8 fs-4">
              Unfortunately, there is nothing to see in URL you specified...
            </p>
            <Link to="/">
              <button className="btn btn-dark btn-lg" type="button">
                Go back to the home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundError;

import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="text-center py-10">
      <h1 className="text-6xl text-red-500 font-bold">
        Something Went Wrong...
      </h1>
      {error && (
        <div className="my-10 flex flex-col gap-5">
          <h3 className="text-5xl font-bold text-slate-700">
            Error: {error.status}
          </h3>
          <h5 className="text-4xl text-slate-900 font-semibold">
            {error.statusText || error.message}
          </h5>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;

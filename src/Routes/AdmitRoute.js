import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  //   const location = useLocation();

  const [isAdmin, isAdminLoading] = useAdmin(user.email);

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner></Spinner>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  //   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  return (
    <h2 className="text-4xl text-red-500 text-center mt-5">
      You are not an admin..Please login with an admin profile
    </h2>
  );
};

export default AdminRoute;

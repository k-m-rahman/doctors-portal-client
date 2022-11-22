import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const GoogleSingIn = ({ setError, from }) => {
  const googleProvider = new GoogleAuthProvider();
  const { providerLogin, setForUpdate } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  // google sign in
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        setForUpdate((prev) => !prev);
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("https://doctor-portal-server-side-three.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreatedUserEmail(email);
      });
  };

  return (
    <>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
        CONTINUE WITH GOOGLE
      </button>
    </>
  );
};

export default GoogleSingIn;

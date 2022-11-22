import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, setForUpdate, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }
  // signup
  const handleSignUp = (data) => {
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            setForUpdate((prev) => !prev);
            saveUser(data.name, data.email);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        setSignUpError(error?.message);
        console.error(error);
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
    <div className="mt-16">
      <div className="flex flex-col justify-center items-center gap-5 mx-auto w-[400px] p-10 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-accent ">Signup</h2>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="grid grid-cols-1 gap-3 w-full "
        >
          {/* name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-xs m-1">{errors.name?.message}</p>
            )}
          </div>
          {/* email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs m-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          {/* password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters long or more",
                },
                pattern: {
                  value: /(?=.*?[#?!@$%^&*-])/,
                  message: "Password must have at least one special character",
                },
                // onek gula validate korar jonno eita use kora laglo . cz pattern a ekta pattern ee
                // deya jay
                validate: {
                  equals: (password) => {
                    if (!/(?=.*?[0-9])/.test(password)) {
                      return "Password must have at least one digit";
                    } else if (!/(?=.*?[A-Z])/.test(password)) {
                      return "Password must have at least one capital letter";
                    }
                  },
                },
              })}
              className="input input-bordered w-full"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs m-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          {/* signup button  */}
          <input
            className="btn btn-accent w-full"
            type="submit"
            value="Signup"
          />
        </form>
        {/* firebase error showing */}
        {signUpError && <p className="text-sm text-red-500">{signUpError}</p>}
        <div className="text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-secondary">
              Please login
            </Link>{" "}
          </p>
        </div>
        <div className="divider ">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSingIn from "../../components/GoogleSignIn/GoogleSingIn";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [loginUserEmail, setLogInUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  // eita useEffect diye korar karon hocche ekta error dey r naile .. Cannot update a component while rendering a different component warning
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLogInUserEmail(data.email);
      })
      .catch((error) => {
        setLoginError(error.message);
        console.error(error);
      });
  };

  return (
    <div className="mt-16 ">
      <div className="flex flex-col justify-center items-center gap-5 mx-auto w-[400px] p-10 shadow-xl  rounded-xl">
        <h2 className="text-3xl font-bold text-accent ">Login</h2>
        <form
          className="grid grid-cols-1 gap-3 w-full "
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email Address is required",
              })}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm m-1">
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
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters or more",
                },
              })}
              type="password"
            />
            {/* password error */}
            {errors.password && (
              <p className="text-red-500 text-sm m-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <p className="text-accent text-sm">Forgot Password?</p>

          <input
            className="btn btn-accent w-full"
            type="submit"
            value="Login"
          />
        </form>
        {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        <div className="text-sm text-center">
          <p>
            New to Doctors Portal?{" "}
            <Link to="/signup" className="text-secondary">
              Create new account
            </Link>{" "}
          </p>
        </div>
        <div className="divider ">OR</div>
        <GoogleSingIn from={from} setError={setLoginError}></GoogleSingIn>
      </div>
    </div>
  );
};

export default Login;

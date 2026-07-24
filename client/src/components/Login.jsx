import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const url =
      state === "login"
        ? "/api/user/login"
        : "/api/user/register";

    const { data } = await axios.post(url, formData);

    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setShowLogin(false);
      navigate("/");

      toast.success(
        state === "login"
          ? "Login successful"
          : "Account created successfully"
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6">

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 hover:scale-110 transition"
        >
          <img
            src={assets.close_icon}
            alt="close"
            className="w-4"
          />
        </button>

        <div className="flex justify-center">
          <img
            src={assets.logo}
            alt="Logo"
            className="h-12"
          />
        </div>

        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            {state === "login"
              ? "Login to continue booking your favourite cars."
              : "Create your account to start renting premium cars."}
          </p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="mt-6 space-y-4"
        >
          {state === "signup" && (
            <div>
              <label className="text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                placeholder="John Doe"
                required
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2.5 outline-primary"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="example@gmail.com"
              required
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2.5 outline-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 outline-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img
                  src={
                    showPassword
                      ? assets.eye_close_icon
                      : assets.eye_icon
                  }
                  alt="toggle password"
                  className="w-5"
                />
              </button>
            </div>
          </div>

          {state === "login" && (
            <div className="text-right">
              <button
                type="button"
                className="text-primary text-sm hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull text-white py-3 rounded-lg font-semibold transition"
          >
            {state === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() =>
              setState(state === "login" ? "signup" : "login")
            }
            className="text-primary font-semibold ml-2 hover:underline"
          >
            {state === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
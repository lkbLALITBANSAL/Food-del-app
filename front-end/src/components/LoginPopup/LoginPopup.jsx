import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const LoginPopup = ({ setshowLogin }) => {
  const { url, settoken } = useContext(StoreContext);

  const [currState, setcurrState] = useState("Login");

  const [loading, setLoading] = useState(false);

  const [showOTP, setShowOTP] = useState(false);

  const [otpTimer, setOtpTimer] = useState(60);

  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const resetForm = () => {
    setShowOTP(false);

    setOtp("");

    setOtpTimer(60);

    setError("");

    setSuccess("");

    setLoading(false);

    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const changeState = (state) => {
    setcurrState(state);

    resetForm();
  };

  useEffect(() => {
    let interval;

    if (showOTP && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [showOTP, otpTimer]);

  const validateSignup = () => {
    if (data.name.trim().length < 3) {
      setError("Name should contain at least 3 characters.");
      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(data.email)) {
      setError("Enter a valid email address.");
      return false;
    }

    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/.test(
        data.password
      )
    ) {
      setError(
        "Password must contain uppercase, lowercase, number and special character."
      );

      return false;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");

      return false;
    }

    return true;
  };

  // ================= LOGIN / SIGNUP =================

  const onLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (currState === "Sign up") {
        if (!validateSignup()) {
          setLoading(false);
          return;
        }

        const response = await axios.post(
          url + "/api/user/register",
          {
            name: data.name,
            email: data.email,
            password: data.password,
          }
        );

        if (response.data.success) {
          setSuccess("OTP has been sent to your email.");

          setShowOTP(true);

          setOtpTimer(60);
        } else {
          setError(response.data.message);
        }
      } else {
        const response = await axios.post(
          url + "/api/user/login",
          {
            email: data.email,
            password: data.password,
          }
        );

        if (response.data.success) {
          localStorage.setItem(
            "token",
            response.data.token
          );

          settoken(response.data.token);

          setshowLogin(false);
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);

      setError("Something went wrong.");
    }

    setLoading(false);
  };

  // ================= VERIFY OTP =================

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter 6 digit OTP.");
      return;
    }

    setLoading(true);

    setError("");

    try {
      const response = await axios.post(
        url + "/api/user/verify-otp",
        {
          email: data.email,
          otp,
        }
      );

      if (response.data.success) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        settoken(response.data.token);

        setshowLogin(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setError("OTP verification failed.");
    }

    setLoading(false);
  };

  // ================= RESEND OTP =================

  const resendOTP = async () => {
    try {
      setError("");

      const response = await axios.post(
        url + "/api/user/resend-otp",
        {
          email: data.email,
        }
      );

      if (response.data.success) {
        setSuccess("New OTP sent.");

        setOtp("");

        setOtpTimer(60);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setError("Unable to resend OTP.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const response = await axios.post(
      url + "/api/user/google-login",
      {
        credential: credentialResponse.credential,
      }
    );

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);

      settoken(response.data.token);

      setshowLogin(false);
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    console.log(error);

    setError("Google Login Failed.");
  }
};

const handleGoogleError = () => {
  console.log("Google Login Failed");
};
  const closePopup = () => {
    resetForm();

    setcurrState("Login");

    setshowLogin(false);
  };

  return (
    <div className="login-popup">

      <div className="login-popup-container">

        {/* Header */}

        <div className="login-popup-header">

          <div>
            <h2>
              {showOTP
                ? "Verify Email"
                : currState === "Login"
                ? "Welcome Back 👋"
                : "Create Account"}
            </h2>

            <p>
              {showOTP
                ? "Enter the OTP sent to your email"
                : currState === "Login"
                ? "Login to continue ordering delicious food."
                : "Join Food Delivery today."}
            </p>
          </div>

          <img
            src={assets.cross_icon}
            alt=""
            onClick={closePopup}
          />

        </div>

        {/* ================= OTP SCREEN ================= */}

        {showOTP ? (

          <div className="otp-container">

            <input
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />

            {error && (
              <p className="login-error">{error}</p>
            )}

            {success && (
              <p className="login-success">{success}</p>
            )}

            <button
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="otp-footer">

              {otpTimer > 0 ? (

                <p>
                  Resend OTP in
                  <span> {otpTimer}s</span>
                </p>

              ) : (

                <p
                  className="resend"
                  onClick={resendOTP}
                >
                  Resend OTP
                </p>

              )}

            </div>

          </div>

        ) : (

          <form
            onSubmit={onLogin}
            className="login-form"
          >

            {currState === "Sign up" && (

              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                required
              />

            )}

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
  
              <span
                className="password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </span>

            </div>

            {currState === "Sign up" && (

              <div className="password-box">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={onChangeHandler}
                  required
                />

                <span
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </span>

              </div>

            )}

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            {success && (
              <p className="login-success">
                {success}
              </p>
            )}

            {currState === "Login" && (
              <p className="forgot-password">
                Forgot Password?
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : currState === "Login"
                ? "Login"
                : "Create Account"}
            </button>

           <div className="google-divider">
  <span>OR</span>
</div>

<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
/>

            {currState === "Sign up" && (

              <div className="login-popup-condition">

                <input
                  type="checkbox"
                  required
                />

                <p>
                  I agree to the Terms &
                  Conditions and Privacy
                  Policy.
                </p>

              </div>

            )}

            <p className="switch-auth">

              {currState === "Login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <span
                onClick={() =>
                  changeState(
                    currState === "Login"
                      ? "Sign up"
                      : "Login"
                  )
                }
              >
                {currState === "Login"
                  ? " Sign Up"
                  : " Login"}
              </span>

            </p>

          </form>

        )}

      </div>

    </div>
  );
};

export default LoginPopup;
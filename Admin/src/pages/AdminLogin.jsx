import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const url =
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000";

function AdminLogin() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    setupKey: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup
        ? "/api/admin/signup"
        : "/api/admin/login";

      const response = await axios.post(
        url + endpoint,
        form
      );

      if (response.data.success) {
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        localStorage.setItem(
          "adminInfo",
          JSON.stringify(response.data.admin)
        );

        navigate("/");
      } else {
        setError(
          response.data.message || "Something went wrong."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  const changeMode = () => {
    setIsSignup((prev) => !prev);
    setError("");
    setForm({
      name: "",
      email: "",
      password: "",
      setupKey: ""
    });
  };

  return (
    <div className="admin-auth">
      <form onSubmit={onSubmitHandler} className="auth-card">
        <h2>
          {isSignup ? "Create Admin" : "Admin Login"}
        </h2>

        <p>
          {isSignup
            ? "Initialize your Eatzo admin account."
            : "Sign in to manage Eatzo."}
        </p>

        {isSignup && (
          <>
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={onChangeHandler}
              required
            />

            <input
              name="setupKey"
              type="password"
              placeholder="Admin setup key"
              value={form.setupKey}
              onChange={onChangeHandler}
              autoComplete="off"
              required
            />
          </>
        )}

        <input
          name="email"
          type="email"
          placeholder="Admin email"
          value={form.email}
          onChange={onChangeHandler}
          autoComplete="username"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChangeHandler}
          autoComplete={
            isSignup ? "new-password" : "current-password"
          }
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isSignup
            ? "Create Admin Account"
            : "Login"}
        </button>

        <p className="auth-switch">
          {isSignup
            ? "Already have an admin account?"
            : "Setting up the first admin?"}

          <button
            type="button"
            onClick={changeMode}
            className="text-button"
          >
            {isSignup ? "Login" : "Initial signup"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
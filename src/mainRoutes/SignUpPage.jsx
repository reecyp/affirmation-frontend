import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function SignUpPage() {
  const API_URL = "https://affirmation-backend-91g3.onrender.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    console.log("Username:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await fetch(`${API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      if (!res.ok) {
        setIsError(true);
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      sessionStorage.setItem("user", JSON.stringify(data.data));
      navigate("/user-home");
    } catch (error) {
      setIsError(true);
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="form-input"
            />
          </div>

          {isError && (
            <div className="error-message">
              <p>
                Please make sure your email is correct and hasn't been used before.
              </p>
            </div>
          )}

          <button type="submit" className="login-button">
            Sign Up
          </button>

          <div className="signup-prompt">
            <p>Already have an account?</p>
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

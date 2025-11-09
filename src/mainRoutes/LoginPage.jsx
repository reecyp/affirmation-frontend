import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const API_URL = "https://affirmation-backend-91g3.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await fetch(`${API_URL}/api/user`);
      const data = await res.json();
      const usersArray = data.data;
      console.log(usersArray);
      const foundUser = usersArray.filter(
        (singleUser) =>
          singleUser.email === email && singleUser.password === password
      )[0];
      if (foundUser) {
        sessionStorage.setItem("user", JSON.stringify(foundUser))
        navigate("/user-home");
      } else {
        setError(true)
      }
    } catch (error) {
      setError(true);
      console.error("Error message: ", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              <p>Invalid email or password. Please try again.</p>
            </div>
          )}

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="signup-prompt">
            <p>Don't have an account?</p>
            <Link to="/sign-up" className="signup-link">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

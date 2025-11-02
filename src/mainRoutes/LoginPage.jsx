import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <h1>Login</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>No account found.</p>}
        <br />
        <button onClick={handleSubmit}>Login</button>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}

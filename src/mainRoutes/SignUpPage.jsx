import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const API_URL = "https://affirmation-backend-91g3.onrender.com";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
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
        {isError && (
          <p>
            Please make sure your email is the correct format and the account
            hasn't been created.
          </p>
        )}
        <br />
        <br />

        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  );
}

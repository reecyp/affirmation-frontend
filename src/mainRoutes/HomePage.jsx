import { Link } from "react-router-dom";

export default function Home() {
  const API_URL = "https://affirmation-backend-91g3.onrender.com";

  return (
    <>
      <h1>Home page!</h1>
      <Link to="/login">Login</Link>
      <button onClick={logUsers}>Log Users</button>
    </>
  );
  
  async function logUsers() {
    const res = await fetch(`${API_URL}/api/user`)
    const data = await res.json()
    console.log(data.data)
  }

}

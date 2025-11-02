import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./mainRoutes/HomePage";
import Login from "./mainRoutes/LoginPage";
import SignUpPage from "./mainRoutes/SignUpPage";
import UserHome from "./mainRoutes/UserHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/user-home" element={<UserHome />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

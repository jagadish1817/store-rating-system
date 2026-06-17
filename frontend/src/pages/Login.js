import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // 👈 HERE (inside component)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "USER") {
        navigate("/stores");
      } else if (res.data.role === "OWNER") {
        navigate("/owner");
      }
    } catch (err) {
      alert("Login Failed");
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>

        <input
          className="login-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

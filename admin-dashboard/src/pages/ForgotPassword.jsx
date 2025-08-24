import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultDarkMode = location.state?.darkMode ?? false;

  const [darkMode, setDarkMode] = useState(defaultDarkMode);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Reset link sent! Check your email.");
      setMessageType("success");
    } catch (err) {
      setMessage("❌ Failed to send reset email. Check address.");
      setMessageType("error");
    }
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  return (
    <div className={`login-container ${darkMode ? "dark" : ""}`}>
      <form className={`login-box ${darkMode ? "dark-mode" : ""}`} onSubmit={handleSubmit}>
        <h2>🔑 Reset Password</h2>

        {message && <div className={`toast ${messageType}`}>{message}</div>}

        <div className="input-group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <button type="submit">Send Reset Link</button>

        <div className="forgot">
          <a
            href="#"
            onClick={() => navigate("/", { state: { darkMode } })}
          >
            🔙 Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}

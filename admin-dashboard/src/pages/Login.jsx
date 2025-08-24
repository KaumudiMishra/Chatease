import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      localStorage.setItem("adminLoginTime", new Date().toLocaleString());
      setSuccess("✅ Welcome to ChatEase, Admin!");
      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("❌ Invalid email or password.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-container ${darkMode ? "dark" : ""}`}>
      {/* Animated Background Elements */}
      <div className="background-elements">
        {/* Floating Orbs */}
        <div className={`floating-orb orb-1 ${darkMode ? 'dark' : ''}`}></div>
        <div className={`floating-orb orb-2 ${darkMode ? 'dark' : ''}`}></div>
        <div className={`floating-orb orb-3 ${darkMode ? 'dark' : ''}`}></div>

        {/* Animated Gradient Mesh */}
        <div className="gradient-mesh">
          <div className={`mesh-overlay ${darkMode ? 'dark' : ''}`}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`floating-particle ${darkMode ? 'dark' : ''}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="login-content">
        <div className="login-form-wrapper">
          {/* Login Form */}
          <form
            className={`login-form ${darkMode ? "dark-mode" : ""}`}
            onSubmit={handleLogin}
            autoComplete="off"
          >
            {/* Cartoon Character */}
            <div className="character-section">
              <div className="robot-container">
                <div className="robot-emoji">🤖</div>
                <div className="status-indicator">
                  <div className="ping-dot"></div>
                </div>
              </div>
              <div className="speech-bubble-container">
                <div className={`speech-bubble ${darkMode ? 'dark' : ''}`}>
                  <span className="greeting-text">Hyy Admin! 👋</span>
                </div>
                <div className={`speech-tail ${darkMode ? 'dark' : ''}`}></div>
              </div>
            </div>

            {/* Header */}
            <div className="form-header">
              <h2 className={`form-title ${darkMode ? 'dark' : ''}`}>
                💬 ChatEase Admin Login
              </h2>
              <div className={`title-underline ${darkMode ? 'dark' : ''}`}></div>
            </div>

            {/* Toast Messages */}
            {error && (
              <div className="toast error">
                {error}
              </div>
            )}
            {success && (
              <div className="toast success">
                {success}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className={`form-input ${darkMode ? 'dark' : ''}`}
              />
              <label className={`form-label ${darkMode ? 'dark' : ''}`}>
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder=" "
                className={`form-input password-input ${darkMode ? 'dark' : ''}`}
              />
              <label className={`form-label ${darkMode ? 'dark' : ''}`}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`password-toggle ${darkMode ? 'dark' : ''}`}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="forgot-password">
              <button
                type="button"
                onClick={() => navigate("/forgot-password", { state: { darkMode } })}
                className={`forgot-link ${darkMode ? 'dark' : ''}`}
              >
                🔗 Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`login-button ${darkMode ? 'dark' : ''} ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  ⏳ Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`theme-toggle ${darkMode ? 'dark' : ''}`}
      >
        <span className="theme-icon">{darkMode ? "☀️" : "🌙"}</span>
      </button>
    </div>
  );
}
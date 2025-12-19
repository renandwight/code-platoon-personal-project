import "../styles/auth.css"
import { useState } from "react";
import { signUp, logIn } from "../api/auth";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Form, FloatingLabel, Container } from "react-bootstrap";

export default function RegisterLogin() {
  
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";

  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return
    }

    const userData = {
      email: formData.email.trim(),
      password: formData.password,
    }

    try {
      const user = isLogin ? await logIn(userData) : await signUp(userData);
      setUser(user)
      navigate("/home", {replace: true})
    } catch (error) {
      console.log("error", error)
    }
  };

  return (
    <Container className="auth-wrap">
      <div className="auth-panel">
        <div className="auth-scanlines" />

        <div className="auth-header">
          <div className="auth-kicker">AURORA ACCESS</div>
          <h1 className="auth-title">{isLogin ? "SIGN IN" : "SIGN UP"}</h1>
          <div className="auth-subtitle">
            {isLogin
              ? "Welcome Back."
              : "Ready to Begin."}
          </div>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={`auth-toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => switchMode("login")}
          >
            LOG IN
          </button>
          <button
            type="button"
            className={`auth-toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => switchMode("signup")}
          >
            SIGN UP
          </button>
        </div>

        <Form onSubmit={handleSubmit} className="auth-form">
          <FloatingLabel controlId="email" label="" className="mb-3">
            <Form.Control
              className="auth-input"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="" className="mb-3">
            <Form.Control
              className="auth-input"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
          </FloatingLabel>

          {!isLogin && (
            <FloatingLabel
              controlId="confirmPassword"
              label=""
              className="mb-3"
            >
              <Form.Control
                className="auth-input"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </FloatingLabel>
          )}

          <div className="auth-actions">
            <Button type="submit" className="auth-submit">
              {isLogin ? "ENTER SYSTEM" : "CREATE ACCESS"}
            </Button>

            <div className="auth-hint">
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

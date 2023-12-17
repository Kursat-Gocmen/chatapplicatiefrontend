import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Dit veld is verplicht!
      </div>
    );
  }
};



const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      navigate("/profile");
    }
  }, [navigate]);
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container" style={{ backgroundColor: '#343a40' }}>
      <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /><Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username" style={{ color: 'white' }}>Gebruikersnaam</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              id="username" 
              autoComplete="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="password" style={{ color: 'white' }}>Wachtwoord</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              id="password" 
              autoComplete="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
  
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          <div>
          <p style={{ color: 'white' }} className="mb-0">
             Heb je geen account-?{" "}
             <a href="/register" className="text-white fw-bold" style={{ color: 'blue'}}>
            Registreer nu.
          </a>
          </p>
        </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );  
}  

export default Login;
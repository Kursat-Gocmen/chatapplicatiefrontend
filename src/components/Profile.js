import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    window.location.replace("/login");
    return null;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}'s</strong> Profile
        </h3>
        <p>
          <strong>token:</strong> {currentUser.token}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </header>
    </div>
  );
};

export default Profile;

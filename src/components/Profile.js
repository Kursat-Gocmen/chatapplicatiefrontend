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
          <strong> Profile </strong>
        </h3>
        <p>
          <strong>token:</strong> {currentUser.token}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>fullname</strong> {currentUser.fullname}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>role:</strong> {currentUser.roles}
        </p>
      </header>
    </div>
  );
};

export default Profile;

import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    window.location.replace("/login");
    return null;
  }

  return (
    <div className="container mt-5">
        <div className="text-white text-center">
          <h3>Mijn Gegevens</h3>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID:</strong> {currentUser.id}
            </li>
            <li className="list-group-item">
              <strong>Gebruikersnaam:</strong> {currentUser.username}
            </li>
            <li className="list-group-item">
              <strong>Volledige Naam:</strong> {currentUser.fullname}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {currentUser.email}
            </li>
            <li className="list-group-item">
              <strong>Rol:</strong> {currentUser.role}
            </li>
            <li className="list-group-item">
              <strong>Token:</strong> 
              <div style={{ overflowWrap: "break-word" }}>
                {currentUser.token}
              </div>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Profile;

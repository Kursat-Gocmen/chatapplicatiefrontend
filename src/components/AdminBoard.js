import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import UserService from "../services/user.service";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleDelete = (userId) => {
    UserService.deleteUser(userId)
      .then(() => {
        fetchUsers(); // Refresh na het verwijderen van de user
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="container">
      <h1 style={{ color: 'white' }}>User Management</h1>
      <div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>ID</th>
              <th style={{ color: 'white' }}>Username</th>
              <th style={{ color: 'white' }}>Fullname</th>
              <th style={{ color: 'white' }}>Email</th>
              <th style={{ color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ color: 'white' }}>{user.id}</td>
                <td style={{ color: 'white' }}>{user.username}</td>
                <td style={{ color: 'white' }}>{user.fullname}</td>
                <td style={{ color: 'white' }}>{user.email}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

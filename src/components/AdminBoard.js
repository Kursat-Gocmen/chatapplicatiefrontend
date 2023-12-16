import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UserService from "../services/user.service";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Fout bij ophalen van accounts.", error);
      });
  };

  const handleDelete = (userId) => {
    UserService.deleteUser(userId)
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Fout bij het verwijderen van de account", error);
      });
  };

  const handleSaveEdit = (userId, editedData) => {
    UserService.updateUser(userId, editedData)
      .then(() => {
        fetchUsers();
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Fout bij het opslaan van de wijzigingen", error);
      });
  };

  const handleCleanMessages = () => {
    UserService.cleanChatMessages()
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Fout bij het verwijderen van de berichten", error);
      });
  };
  
  return (
    <div className="container">
      <h1 style={{ color: "white" }}>User Management</h1>
      <Button variant="dark" onClick={handleCleanMessages}>
        Clean Public Chat
      </Button>
      <div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={{ color: "white" }}>ID</th>
              <th style={{ color: "white" }}>Gebruikersnaam</th>
              <th style={{ color: "white" }}>Volledige Naam</th>
              <th style={{ color: "white" }}>Email</th>
              <th style={{ color: "white" }}>Opties</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ color: "white" }}>{user.id}</td>
                <td style={{ color: "white" }}>{user.username}</td>
                <td style={{ color: "white" }}>{user.fullname}</td>
                <td style={{ color: "white" }}>{user.email}</td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => {
                      setEditedUser(user);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="light"
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

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* fields for editing username, fullname, email */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.username || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.fullname || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, fullname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedUser.email || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSaveEdit(editedUser.id, editedUser)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;

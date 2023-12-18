import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UserService from "../services/user.service";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

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
    setDeletingUserId(userId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    UserService.deleteUser(deletingUserId)
      .then(() => {
        fetchUsers();
        setShowDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error("Fout bij het verwijderen van de account", error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeletingUserId(null);
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

      <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
        <Modal.Header>
          <Modal.Title>Bevestig het verwijderen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Ben je zeker dat je deze gebruiker wilt verwijderen?
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Annuleer
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Verwijder
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Bewerk gebruiker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Gebruikersnaam</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.username || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>Volledige Naam</Form.Label>
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
            Sluit
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSaveEdit(editedUser.id, editedUser)}
          >
            Opslaan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;

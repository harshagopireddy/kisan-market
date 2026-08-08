import { useCallback, useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(() => {
    AdminService.getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;

    AdminService.deleteUser(id)
      .then(() => {
        loadUsers();
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Delete failed";
        alert(message);
      });
  };

  return (
    <div className="users-container">
      <h2>Manage Users</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;

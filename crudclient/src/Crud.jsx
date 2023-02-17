import React from "react";
import { useEffect } from "react";
// import Table from "react-bootstrap/Table";
import Modal from "react-modal";
//import nanoid

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Crud() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userToUpdate, setUserToUpdate] = React.useState();

  const firstNameRef = React.useRef(null);
  const lastNameRef = React.useRef(null);
  const userNameRef = React.useRef(null);
  const professionRef = React.useRef(null);
  const ageRef = React.useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [allUsers, setAllUsers] = React.useState([]);
  const getAllUsers = async () => {
    const response = await fetch("http://localhost:8080/all");
    const jsonData = await response.json();
    console.log(jsonData);
    setAllUsers(jsonData);
  };

  const deleteUser = async (event) => {
    const userId = event.target.value;
    try {
      const deleteTodo = await fetch(`http://localhost:8080/delete/${userId}`, {
        method: "DELETE",
      });
      console.log(deleteTodo);
      getAllUsers();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserToUpdate(null);

    const firstname = firstNameRef.current.value;
    const lastname = lastNameRef.current.value;
    const username = userNameRef.current.value;
    const profession = professionRef.current.value;
    const age = ageRef.current.value;
    const user = { firstname, lastname, username, profession, age };
    //console.log(user);
    fetch("http://localhost:8080/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(res);
      getAllUsers();
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    openModal();
    // setUserToUpdate(e.target.value);
    console.log(JSON.parse(e.target.value));
    setUserToUpdate(JSON.parse(e.target.value));

    const firstname = firstNameRef.current.value;
    const lastname = lastNameRef.current.value;
    const username = userNameRef.current.value;
    const profession = professionRef.current.value;
    const age = ageRef.current.value;
    const user = { firstname, lastname, username, profession, age };
    //update the user
    fetch("http://localhost:8080/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(res);
      getAllUsers();
    });
  };

  return (
    <React.Fragment>
      <div className="mini-container">
        <button onClick={openModal} className="btn btn-success">
          Add User
        </button>

        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Profession</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.userId}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.profession}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      onClick={handleUpdate}
                      value={JSON.stringify(user)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={deleteUser}
                      value={user.userId}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div id="form">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                ref={firstNameRef}
                required
                defaultValue={
                  userToUpdate != null ? userToUpdate.firstname : ""
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                ref={lastNameRef}
                required
                defaultValue={userToUpdate != null ? userToUpdate.lastname : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                ref={userNameRef}
                required
                defaultValue={userToUpdate != null ? userToUpdate.username : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profession">Profession</label>
              <input
                type="text"
                className="form-control"
                id="profession"
                ref={professionRef}
                required
                defaultValue={
                  userToUpdate != null ? userToUpdate.profession : ""
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                ref={ageRef}
                required
                defaultValue={userToUpdate != null ? userToUpdate.age : ""}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
}

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   useGetAllTodosQuery,
//   useAddTodosMutation,
//   useUpdateTodosMutation,
// } from "../store";

// const UpdatePage = () => {
//   const [updateTodos] = useUpdateTodosMutation();
//   const { id } = useParams(); // Access ID parameter from the URL
//   const {
//     data: todos = [],
//     isFetching,
//     isError,
//     error,
//   } = useGetAllTodosQuery();
//   const [updateTodo, setUpdateTodo] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [addTodoMutation] = useAddTodosMutation();

//   useEffect(() => {
//     if (id && todos.length > 0) {
//       const todoToUpdate = todos.find((todo) => todo.id === parseInt(id));
//       setUpdateTodo(todoToUpdate);
//       setUpdatedData({
//         firstName: todoToUpdate.firstName,
//         lastName: todoToUpdate.lastName,
//         email: todoToUpdate.email,
//         birthdate: todoToUpdate.birthdate,
//         password: todoToUpdate.password,
//       });
//     }
//   }, [id, todos]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   const handleUpdate = async (id) => {
//     const updateData = data.find((data) => data.id === id);
//   };

//   if (isFetching) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Update Page</h1>
//       <p>ID: {id}</p>
//       <div>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="firstName"
//             value={updatedData.firstName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             value={updatedData.lastName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={updatedData.email}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Birthdate:
//           <input
//             type="date"
//             name="birthdate"
//             value={updatedData.birthdate}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={updatedData.password}
//             onChange={handleInputChange}
//           />
//         </label>
//         <button onClick={handleUpdate(data.id)}>Update Todo</button>
//       </div>
//     </div>
//   );
// };

// export default UpdatePage;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAllTodosQuery, useUpdateTodosMutation } from "../store";

const UpdatePage = () => {
  const [updateTodos] = useUpdateTodosMutation();
  const { id } = useParams(); // Access ID parameter from the URL
  const {
    data: todos = [],
    isFetching,
    isError,
    error,
  } = useGetAllTodosQuery();
  const [updateTodo, setUpdateTodo] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    if (id && todos.length > 0) {
      const todoToUpdate = todos.find((todo) => todo.id === parseInt(id));
      setUpdateTodo(todoToUpdate);
      setUpdatedData({
        firstName: todoToUpdate.firstName,
        lastName: todoToUpdate.lastName,
        email: todoToUpdate.email,
        birthdate: todoToUpdate.birthdate,
        password: todoToUpdate.password,
      });
    }
  }, [id, todos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      if (!updateTodo) return; // Check if updateTodo is null before updating
      await updateTodos({ id: updateTodo.id, data: updatedData });
      // Optionally, add code to handle success or navigate to a different page
    } catch (error) {
      console.error("Error updating todo:", error);
      // Optionally, display an error message or handle the error
    }
  };

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Update Page</h1>
      <p>ID: {id}</p>
      {updateTodo && (
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={updatedData.firstName || ""}
              onChange={handleInputChange}
            />
          </label>
          {/* Other input fields */}
          <button onClick={handleUpdate}>Update Todo</button>
        </div>
      )}
    </div>
  );
};

export default UpdatePage;

import React, { useState } from 'react'
import Swal from "sweetalert2"
import EditTodo from "./forms/EditTodo"

const Todo = (props) => {
    const deleteHandler = (id) => {
        // alert('Delete Todo')
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://localhost:5000/todos/"+id, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    props.getTodos()
                    Swal.fire(
                      'Deleted!',
                      data.message,
                      'success'
                    )
                })
            }
          })
    }

    const [editing, setEditing] = useState(false)

     return (
        <div>
            {editing ?
                <EditTodo data={props.data} updateTodo={props.data._id} setEditing={setEditing} getTodos={props.getTodos}/> :
                <div>
                    <h3>{props.data.name}</h3>
                </div>
            }
            <button onClick={() => setEditing(!editing)}>
                {!editing? "Edit": "Cancel"}
            </button>
            <button onClick={() => deleteHandler(props.data._id)}>Delete</button>

        </div>
    )
}

export default Todo

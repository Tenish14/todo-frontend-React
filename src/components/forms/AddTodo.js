import React, { useState } from 'react';
import Swal from "sweetalert2"

const AddTodo = (props) => {
    const [todo, setTodo] = useState({
        name: ""
    })

    let handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/todos", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .then(data => {
            // alert(data.message)
            Swal.fire(
                'Good Job !',
                data.message,
                'success'
            )
            props.getTodos()
        }).catch(e => console.log(e))
    }

    let onChangeHandler = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Todo Name:</label>
                <input 
                type="text" 
                name="name" 
                value={todo.name}
                onChange={onChangeHandler} />
            </div>
            <button>Submit</button>
        </form>
    )
}

export default AddTodo
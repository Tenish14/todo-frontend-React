import React, { useState } from 'react';

const EditTodo = (props) => {
    
    const [todo, setTodo] = useState({
         name:props.data.name
    })

    let onChangehandler = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    let handleEdit = (e, id) => {
        e.preventDefault()
        props.setEditing(false)
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .then(data => {
            props.getTodos()
        }).catch(e => console.log(e))
    }


    return(
        <form onSubmit={(e) => {handleEdit(e, props.data._id)}}>
            <div>
                <label>New Todo Name:</label>
                <input 
                    type="text"
                    name="name"
                    value={todo.name}
                    onChange={onChangehandler}
                />
            </div>
            <button>Submit</button>
        </form>
    )
}

export default EditTodo;
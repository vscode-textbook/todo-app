"use client"

import React from 'react';
import { Paper, TextField, Button, Checkbox } from "@mui/material";
import { Todo } from '../types/todo';
import css from './TodoList.module.css';
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const TodoList = () => {

    const [todos, setTodos] = React.useState<Todo[]>([]); 
    const [currentTask, setCurrentTask] = React.useState("");

    React.useEffect(() => {
        axios.get(apiUrl + "/todos")
        .then((response) => {
            const {data} = response;
            setTodos(data)
         })
        .catch((error) => {console.log(error)});
    }, []);

    const addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const originalTodos = todos;
        axios.post(apiUrl + "/todos", { task: currentTask })
        .then((response) => {
            const {data} = response;
            setTodos([...originalTodos, data]);
            setCurrentTask("");
        })
        .catch((error) => {console.log(error)});
    };

    const updateTodo = async (id: string) => {
        const originalTodos = todos;
        const newTodos = [...originalTodos];
        const index = newTodos.findIndex((task) => task.id === id);
        newTodos[index] = { ...newTodos[index] };
        newTodos[index].completed = !newTodos[index].completed;
        axios.put(apiUrl + "/todos/" + id, {
            task: newTodos[index].task,
            completed: newTodos[index].completed,
        })
        .catch ( (error) => {
            setTodos(originalTodos);
            console.log(error);
        });
        setTodos(newTodos)
    };

    const deleteTodo = async (id: string) => {
        const originalTodos = todos;
        const newTodos = originalTodos.filter((task) => task.id !== id);
        axios.delete(apiUrl + "/todos/" + id)
        .catch ( (error) => {
            setTodos(originalTodos);
            console.log(error);
        });
        setTodos(newTodos)
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(event.target.value);
    };

    return (
        <Paper elevation={3} className={css.container}>
            <div className={css.heading}>Todoリスト</div>
            <form onSubmit={addTodo} className={css.flex} style={{ margin: "10px 0" }} >
                <TextField
                    variant="outlined" size="small" style={{ width: "90%" }}
                    value={currentTask}
                    required={true}
                    onChange={handleChange}
                    placeholder="新しいタスクを追加してください"
                />
                <Button style={{ height: "40px" }} color="primary"
                    variant="contained" type="submit" >追加</Button>
            </form>
            <div>
                {todos.map(todo => (
                    <Paper key={todo.id} className={`${css.flex} ${css.task_container}`}>
                        <Checkbox id={todo.id} checked={todo.completed} color="default"
                            onClick={() => updateTodo(todo.id)}
                        />
                        <div className={ todo.completed ? `${css.task} ${css.line_through}` : `${css.task}` } >
                            {todo.task}
                        </div>
                        <Button color="secondary" onClick={() => deleteTodo(todo.id)}>
                            削除
                        </Button>
                    </Paper>
                ))}
            </div>
        </Paper>
    );
}

export default TodoList;

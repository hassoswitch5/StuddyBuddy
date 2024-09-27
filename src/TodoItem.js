import React from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography } from '@mui/material';

const TodoItem = ({ todo, fetchTodos }) => {
    const deleteTodo = async () => {
        try {
            await axios.delete(`http://localhost:5000/todo/${todo._id}`, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            fetchTodos();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card style={{ marginBottom: 10 }}>
            <CardContent>
                <Typography variant="h6">{todo.text}</Typography>
                <Typography variant="body2">Category: {todo.category}</Typography>
                <Typography variant="body2">Priority: {todo.priority}</Typography>
                <Button variant="contained" color="secondary"  onClick={deleteTodo}>Delete</Button>
            </CardContent>
        </Card>
    );
};

export default TodoItem;

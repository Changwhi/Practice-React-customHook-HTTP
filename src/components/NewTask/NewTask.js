import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useRequest from '../hooks/request';

const NewTask = (props) => {
    const { isLoading, error, sendRequest: sendTaskRequst } = useRequest();

    const createTask = (taskData, taskText) => {
        const generatedId = taskData.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };
        props.onAddTask(createdTask);

    };


    const enterTaskHandler = async (taskText) => {
        sendTaskRequst({
            url:
                'https://react-custom-http-f7a5e-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: { text: taskText },
            headers: {
                'Content-Type': 'application/json',
            }
        }, createTask.bind(null, taskText));
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;

import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useRequest from './components/hooks/request';

function App() {
    const [tasks, setTasks] = useState([]);



    const { isLoading, error, sendRequest: fetchTasks } = useRequest();

    useEffect(() => {
        const requestTasks = (data) => {
            const loadedTasks = [];
            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }
            setTasks(loadedTasks);
        };

        fetchTasks({
            url: 'https://react-custom-http-f7a5e-default-rtdb.firebaseio.com/tasks.json'
        }, requestTasks);
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;

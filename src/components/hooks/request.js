import { useState } from "react";

const useRequest = (requestConfig, applyData) => {

    //const [isLoading, setIsLoading] = useState(false);
    //const [error, setError] = useState(null);

    const [currentState, setCurrentState] = useState({
        isLoading: false,
        error: null,
    })

    const sendRequest = async () => {
        //setError(null);
        setCurrentState({
            ...currentState,
            isLoading: true,
            error: null,
        });

        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data)
            //setTasks(loadedTasks);
        } catch (err) {
            //setError(err.message || 'Something went wrong!');
            setCurrentState({
                ...currentState,
                error: err.message || 'Something went wrong!'
            });
        }

        //setIsLoading(false);
        setCurrentState({
            ...currentState,
            isLoading: false,
        });
    }

    return {
        isLoading: currentState.isLoading,
        error: currentState.error,
        sendRequest: sendRequest,
    }
};


export default useRequest;

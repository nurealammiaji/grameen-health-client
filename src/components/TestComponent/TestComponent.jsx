import React from 'react';
import useUser from '../../hooks/useUser';

const TestComponent = () => {
    const [isUserLoading, userData, refetchUser] = useUser();

    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>User Data:</p>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            <button onClick={refetchUser} className="btn">Refetch User Data</button>
        </div>
    );
};

export default TestComponent;

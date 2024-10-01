import React from 'react';
import useUser from '../../hooks/useUser';

const TestComponent = () => {
    const { isUserLoading, isUserError, userData, refetchUser, userError } = useUser();

    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>User Data:</p>
            <img src={`http://localhost:5000/${userData.image}`} alt="" />
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            <button onClick={refetchUser} className="btn">Refetch User Data</button>
        </div>
    );
};

export default TestComponent;

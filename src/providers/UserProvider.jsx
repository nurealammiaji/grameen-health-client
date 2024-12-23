import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const [selectedUsers, setSelectedUsers] = useState([]);

    const addUser = async (formData) => {
        return await axiosPrivate.post('/users/create', formData)
    }

    const deleteUsers = async () => {
        return await axiosPrivate.delete('/users/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                userIds: selectedUsers,
            },
        })
    }

    const editUser = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/users/update/${_id}`, formData)
    }

    const userInfo = {
        addUser,
        editUser,
        deleteUsers,
        selectedUsers,
        setSelectedUsers,
    };

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
'use client'
import { Avatar, Input } from "@nextui-org/react"
import { useState } from "react";
import styles from '@/components/auth/Auth.module.css';
import { GET_PROFILE, UPDATE_PROFILE } from './graphql'; // Replace with your actual GraphQL queries
import { useMutation, useQuery } from "@apollo/client";

function ProfileComponent() {

    const { loading, error, data } = useQuery(GET_PROFILE);

    const [updateProfile] = useMutation(UPDATE_PROFILE);


    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [designation, setDesignation] = useState('');
    const [division, setDivision] = useState('');
    const [permissions, setPermissions] = useState('');


    // Fetching data from GraphQL API
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // Updating profile data
    const handleUpdate = async () => {
        try {
            await updateProfile({
                variables: {
                    input: {
                        username,
                        fullname,

                    },
                },
            });
            // Optionally, you can refetch the data after updating
            // refetch();
        } catch (error: any) {
            console.error('Error updating profile:', error.message);
        }
    };
    const { profile } = data;

    return (
        <div className="flex flex-col items-center ml-10">
            <Avatar
                className="w-40 h-40 mt-5"
                isBordered
                color="danger"
                src="https://i.pravatar.cc/150?u=a042581"
            />
            <div className="flex flex-row items-center  mt-10 space-x-5 mb-10">
                <div className="flex-col space-y-5 w-64 h-64 mb-20">
                    <Input
                        label='Username'
                        labelPlacement='outside'
                        placeholder='Enter username'
                        isRequired={true}
                        value={profile.username}
                        autoComplete='username'
                        onValueChange={(value) => setUsername(value)}
                    />
                    <Input
                        label='Full name'
                        labelPlacement='outside'
                        placeholder='Full name'
                        isRequired={true}
                        value={fullname}
                        autoComplete='fullname'
                        onValueChange={(value) => setFullname(value)}
                    />
                    <Input
                        label='Password'
                        labelPlacement='outside'
                        placeholder='Password'
                        isRequired={true}
                        value={password}
                        autoComplete='password'
                        onValueChange={(value) => setPassword(value)}
                    />
                    <Input
                        label='Email'
                        labelPlacement='outside'
                        placeholder='Enter email'
                        isRequired={true}
                        value={email}
                        autoComplete='email'
                        onValueChange={(value) => setEmail(value)}
                    />
                </div>
                <div className="flex-col space-y-5 w-64 h-64 mb-20">

                    <Input
                        label='Role'
                        labelPlacement='outside'
                        placeholder='Role'
                        isRequired={true}
                        value={role}
                        autoComplete='role'
                        onValueChange={(value) => setRole(value)}
                    />
                    <Input
                        label='Designation'
                        labelPlacement='outside'
                        placeholder='Designation'
                        isRequired={true}
                        value={designation}
                        autoComplete='designation'
                        onValueChange={(value) => setDesignation(value)}
                    />
                    <Input
                        label='Division'
                        labelPlacement='outside'
                        placeholder='Division'
                        isRequired={true}
                        value={division}
                        autoComplete='division'
                        onValueChange={(value) => setDivision(value)}
                    />
                    <Input
                        label='Permissions'
                        labelPlacement='outside'
                        placeholder='Permissions'
                        isRequired={true}
                        value={permissions}
                        autoComplete='permissions'
                        onValueChange={(value) => setPermissions(value)}
                    />
                </div>
            </div>
            <button className=" mb-10 bg-black text-white border-0 w-80 rounded-full px-4 py-2.5 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-gray-900">
                Update
            </button>
        </div>
    )
}

export default ProfileComponent;

"use client";

import React, { useState, useEffect } from 'react';
import { UserData } from '@/types';
import Link from 'next/link';

const USERS_PER_PAGE = 10;

async function fetchUsers(): Promise<UserData[]> {
    const res = await fetch('https://nestjs-taskapi-production.up.railway.app/users', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }
    return res.json();
}

export default function UserList() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <div className=" py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-900 shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">User List</h2>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                    <ul className="mt-4 space-y-2">
                        {currentUsers.map((user) => (
                            <li key={user._id} className="bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                                <Link href={`/profile/${user._id}`} className="block h-full p-3 text-white rounded-md">
                                    {user.username}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

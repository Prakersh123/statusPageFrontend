/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/UserListingTable.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 6:33:59 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React, { useEffect, useState } from 'react'
import CustomTable from '../commonUI/CustomTable';
import { useToast } from "@/hooks/use-toast"

import axiosInstance from '@/lib/axiosHelper';
import TableSkeleton from '../commonUI/TableSkeleton';
import { Edit, Trash2 } from 'lucide-react';

export const UserListingTable = ({fetchAgain}) => {
    const [isDataFetching, setIsDataFetching] = useState(true);
    useEffect(() => {
        setIsDataFetching(true);
        fetchTableData();
    }, [fetchAgain])

    const fetchTableData = async () => {
        await axiosInstance.get('auth/allrace');
        setIsDataFetching(false);
    }
    const columns = [
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Email",
            accessor: "email",
        },
        {
            header: "Role",
            cell: (row) => <span className="font-medium">{row.role}</span>,
        },
        {
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleEdit(row)}
                    >
                        <Edit/>
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(row)}
                    >
                        <Trash2/>
                    </button>
                </div>
            ),
        },
    ];

    const data = [
        { name: "John Doe", email: "john@example.com", role: "Admin" },
        { name: "Jane Smith", email: "jane@example.com", role: "Manager" },
        { name: "Alice Johnson", email: "alice@example.com", role: "Viewer" },
    ];

    const handleEdit = (row) => {
        console.log("Edit:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete:", row);
    };

    if (isDataFetching) {
        return (<TableSkeleton />)
    }
    return (
        
        <div>
            <CustomTable columns={columns} data={data} />
        </div>
    );
}

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

import TableSkeleton from '../commonUI/TableSkeleton';
import { Edit, Trash2 } from 'lucide-react';
import useApi from '@/hooks/use-api';
import useView from '@/hooks/use-view';

export const UserListingTable = ({fetchAgain}) => {
    const {editAllowed} = useView();
    const apiCall = useApi({
        url: 'user/users',
        method: "GET"
    });
    useEffect(() => {
        apiCall.refetch();
    }, [fetchAgain])

    
    const columns = [
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Email",
            accessor: "emailID",
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
                        disabled={editAllowed}

                    >
                        <Edit/>
                    </button>

                </div>
            ),
        },
    ];


    const handleEdit = (row) => {
        console.log("Edit:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete:", row);
    };

    if (apiCall.loading) {
        return (<TableSkeleton />)
    }
    return (
        
        <div>
            <CustomTable columns={columns} data={apiCall.data.userList} />
        </div>
    );
}

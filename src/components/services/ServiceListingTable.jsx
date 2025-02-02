/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/ServiceListing.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 6:33:59 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React, { useEffect, useState } from 'react'
import CustomTable from '../commonUI/CustomTable';
import axiosInstance from '@/lib/axiosHelper';
import TableSkeleton from '../commonUI/TableSkeleton';
import { CircleCheckBig, DeleteIcon, Edit, ShieldX, Trash2 } from 'lucide-react';
import useApi from '@/hooks/use-api';
import { Switch } from '../ui/switch';

export const ServiceListing = ({fetchAgain, callEdit}) => {
    const apiCall = useApi({
        url: '/service/list',
        method: 'GET'
    });
    useEffect(() => {
        // setIsDataFetching(true);
        // fetchTableData();
        apiCall.refetch();
    }, [fetchAgain])

    // const fetchTableData = async () => {
    //     await axiosInstance.get('/service');
    //     setIsDataFetching(false);
    // }
    const columns = [
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Stage",
            cell: (row) => <span>{row.stage.label}</span>,

        },
        {
            header: "Group",
            cell: (row) => <span className="font-medium">{row.group.label}</span>,
        },
        {
            header: "Status",
            cell: (row) => <Switch checked={row.status} />,
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


    const handleEdit = (row) => {
        console.log({
            name: row.name || "",
            serviceGroup: row.group.id || "",
            status: row.status || false,
            stage: row.stage.value || '',
            description: row.description || "",
            serviceID: row.serviceID
        });
        callEdit({
            name: row.name || "",
            serviceGroup: row.group.id || "",
            status: row.status || false,
            stage: row.stage.value || '',
            description: row.description || "",
            serviceID: row.serviceID
        });
        // console.log("Edit:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete:", row);
    };

    if (apiCall.loading) {
        return (<TableSkeleton />)
    }
    return (
        
        <div>
            <CustomTable columns={columns} data={apiCall.data.listItems} />
        </div>
    );
}

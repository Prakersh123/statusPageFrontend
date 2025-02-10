/*
 * Filename: /home/codestax/statusPage/vite-project/src/app/dashboard/Services.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 3:13:56 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */
"use client"; // Required for shadcn/ui components

import MainMenuTemplate from "@/components/commonUI/MainMenuTemplate";
import HeadingTemplate from "@/components/commonUI/HeadingTemplate";
import CustomDialog from "@/components/commonUI/CustomeDialog";

import { useEffect, useState } from "react";
import { CreateUserDialogContent } from "@/components/userManagement/CreateUserDialogContent";
import { UserListingTable } from "@/components/userManagement/UserListingTable";
import { CreateServiceDialogContent } from "@/components/services/CreateServiceDialogContent";
import { ServiceListing } from "@/components/services/ServiceListingTable";
import CustomCollapsible from "@/components/commonUI/CustomCollapsible";
import { SingleServiceStatus } from "@/components/homeDashboard/SingleServiceStatus";
import { IncidentUpdate } from "@/components/incidents/IncidentUpdate";
import useApi from "@/hooks/use-api";
import TableSkeleton from "@/components/commonUI/TableSkeleton";
import webSocketHelper from "@/lib/webSocketHelper";
export default function HomeDashboard() {

 
  const serviceAPICall = useApi({
      url: 'service/dashboard',
      method: 'GET'
    });
    const incidentAPICall = useApi({
      url: 'incident/dashboard',
      method: 'GET'
    });
    const [buttonLoading, setButtonLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);


    const handleHeadingButtonClick = () => {
      setOpenDialog(true);
      setButtonLoading(true);
    }
    const saveUserData = (body) => {
      setOpenDialog(false);
      setReloadTable(true);
      setButtonLoading(false);
      console.log(body);
    }
    // const obj = [
    //   {
    //     serviceGroup: {
    //       label: 'Database',
    //       value: 'database'
    //     },
    //     services: [{
    //       label: 'Mongodb',
    //       value: 'uuid1',
    //       stage: {
    //         value: 'operational',
    //         label: 'Operational'
    //       }
    //     }]
    //   },
    //   {
    //     serviceGroup: {
    //       label: 'Lambda',
    //       value: 'lambda'
    //     },
    //     services: [{
    //       label: 'Mymed Prod',
    //       value: 'uuid1',
    //       stage: {
    //         value: 'performanceIssue',
    //         label: 'Performance Issue'
    //       }
    //     }]
    //   }
    // ]
    const incidentObj = [
      {
        incidentName: 'VPN Block',
        description: 'SOdsflkjdfsadjflsdjf',
        id: '1233',
        serviceGroup: {
          label: 'Database',
          value: 'database'
        },
        service: {
          label: 'Mongodb',
          value: 'uuid1',
        },
        updateList: [
          {
            stageLabel: 'Fixed',
            stageValue: 'fixed',
            comment: 'Prakersh arya ok',
            dateValue: '2025-01-31 at 10:00 AM'
          },
          {
            stageLabel: 'Identified',
            stageValue: 'identified',
            comment: 'Prakersh arya ok',
            dateValue: '2025-01-31 at 10:00 AM'
          }
        ]
      },
    ]
    return <>
      <MainMenuTemplate> 
        <HeadingTemplate headingTab="Dashboard" buttonText="New Service" isButtonAllow={false} handleButtonCallBack={handleHeadingButtonClick} buttonLoading={buttonLoading}/>
        <h1 className="text-2xl font-bold mb-4 ">Services</h1>
        
        {
          serviceAPICall.loading ? <TableSkeleton />:
          serviceAPICall.data.listItems.map((serviceGroup)=>{
            return <SingleServiceStatus data={serviceGroup} key={serviceGroup.serviceGroup.value}/>
          })
        }
        <h1 className="text-2xl font-bold mb-4">Incidents</h1>
        {
          incidentAPICall.loading ? <TableSkeleton />:
          incidentAPICall.data.listItems.map((incidentItem)=>{
            return <IncidentUpdate data={incidentItem} key={incidentItem.id}/>
          })
        }


      </MainMenuTemplate>
    </>
  }
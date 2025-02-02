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

import { useState } from "react";
import { CreateUserDialogContent } from "@/components/userManagement/CreateUserDialogContent";
import { UserListingTable } from "@/components/userManagement/UserListingTable";
import { CreateServiceDialogContent } from "@/components/services/CreateServiceDialogContent";
import { ServiceListing } from "@/components/services/ServiceListingTable";
import CustomCollapsible from "@/components/commonUI/CustomCollapsible";
import { SingleServiceStatus } from "@/components/homeDashboard/SingleServiceStatus";
export default function HomeDashboard() {

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
    const obj = [
      {
        serviceGroup: {
          label: 'Database',
          value: 'database'
        },
        services: [{
          label: 'Mongodb',
          value: 'uuid1',
          stage: {
            value: 'operational',
            label: 'Operational'
          }
        }]
      },
      {
        serviceGroup: {
          label: 'Lambda',
          value: 'lambda'
        },
        services: [{
          label: 'Mymed Prod',
          value: 'uuid1',
          stage: {
            value: 'performanceIssue',
            label: 'Performance Issue'
          }
        }]
      }
    ]
    return <>
      <MainMenuTemplate> 
        <HeadingTemplate headingTab="Dashboard" buttonText="New Service" isButtonAllow={false} handleButtonCallBack={handleHeadingButtonClick} buttonLoading={buttonLoading}/>
        {
          obj.map((serviceGroup)=>{
            return <SingleServiceStatus data={serviceGroup} key={serviceGroup.serviceGroup.value}/>
          })
        }


      </MainMenuTemplate>
    </>
  }
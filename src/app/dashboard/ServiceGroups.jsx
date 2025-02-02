/*
 * Filename: /home/codestax/statusPage/vite-project/src/app/dashboard/ServiceGroups.jsx
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
import { CreateServiceGroupDialogContent } from "@/components/serviceGroups/CreateServiceGroupDialogContent";
import { ServiceGroupListing } from "@/components/serviceGroups/ServiceGroupListing";
export default function ServiceGroups() {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [intialData, setInitialData] = useState({});
    const [isUpdateClicked, setIsUpdateClicked] = useState({});
    const handleHeadingButtonClick = () => {
      setOpenDialog(true);
      setButtonLoading(true);
      setIsUpdateClicked(false);

    }
    const saveUserData = (body) => {
      setOpenDialog(false);
      setReloadTable(true);
      setIsUpdateClicked(false);
      setButtonLoading(false);
    }
    const callEdit = (body) => {
      setOpenDialog(true);
      setButtonLoading(true);
      setInitialData(body);
      setIsUpdateClicked(true)
      console.log(body);
    }
    return <>
      <MainMenuTemplate> 
        <HeadingTemplate headingTab="Service Groups" buttonText="New Group" isButtonAllow={true} handleButtonCallBack={handleHeadingButtonClick} buttonLoading={buttonLoading}/>
        
        {/* Create User Dialog Starts */}
        <CustomDialog open={openDialog} onOpenChange={() =>{setOpenDialog(true)}} dialogTitle="Create New Service Group" dialogDescription="">
          <CreateServiceGroupDialogContent saveChanges={saveUserData}  initialData= {intialData} isUpdateClicked={isUpdateClicked}/>
        </CustomDialog>

        {/* User Listing Table */}
        <ServiceGroupListing fetchAgain={reloadTable} callEdit={callEdit}/>

      </MainMenuTemplate>
    </>
  }
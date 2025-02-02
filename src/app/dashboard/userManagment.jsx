/*
 * Filename: /home/codestax/statusPage/vite-project/src/app/dashboard/userManagment.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 3:13:56 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import MainMenuTemplate from "@/components/commonUI/MainMenuTemplate";
import HeadingTemplate from "@/components/commonUI/HeadingTemplate";
import CustomDialog from "@/components/commonUI/CustomeDialog";

import { useState } from "react";
import { CreateUserDialogContent } from "@/components/userManagement/CreateUserDialogContent";
import { UserListingTable } from "@/components/userManagement/UserListingTable";
export default function UserManagment() {
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
  
    return <>
      <MainMenuTemplate> 
        <HeadingTemplate headingTab="User Managment" buttonText="New User" isButtonAllow={true} handleButtonCallBack={handleHeadingButtonClick} buttonLoading={buttonLoading}/>
        
        {/* Create User Dialog Starts */}
        <CustomDialog open={openDialog} onOpenChange={() =>{setOpenDialog(true)}} dialogTitle="Create User" dialogDescription="">
          <CreateUserDialogContent saveChanges={saveUserData}/>
        </CustomDialog>

        {/* User Listing Table */}
        <UserListingTable fetchAgain={reloadTable} />

      </MainMenuTemplate>
    </>
  }
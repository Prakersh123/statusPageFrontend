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
import { ServiceListingCustomer } from "@/components/services/ServiceListingCustomerSide";
import webSocketHelper from "@/lib/webSocketHelper";
import useApi from "@/hooks/use-api";
import TableSkeleton from "@/components/commonUI/TableSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/store/reducers/serviceActions";
import { IncidentUpdate } from "@/components/incidents/IncidentUpdate";
import { fetchIncidents } from "@/store/reducers/incidentActions";
import { useNavigate } from "react-router-dom";
export default function CustomerScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serviceList, dataLoading } = useSelector((state) => state.service);
    const incident = useSelector((state) => state.incident);

    const [serviceData, setServiceData] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [intialData, setInitialData] = useState({});
    const [isUpdateClicked, setIsUpdateClicked] = useState({});
    

     useEffect(()=> {
        webSocketHelper.openConnection('12345');
        dispatch(fetchServices());  
        dispatch(fetchIncidents());
      }, [dispatch]);

    const handleHeadingButtonClick = () => {
      navigate('/');
    }
    const saveUserData = (body) => {
      setOpenDialog(false);
      setReloadTable(true);
      setIsUpdateClicked(false);
      setButtonLoading(false);
      console.log(body);
    }
  
    const callEdit = (body) => {
      setOpenDialog(true);
      setButtonLoading(true);
      setInitialData(body);
      setIsUpdateClicked(true)
      console.log(body);
    }
    const closeDialog = () => {
      setOpenDialog(false);
      setButtonLoading(false);
    }
    return <>
      <MainMenuTemplate> 
        <HeadingTemplate headingTab="Services" buttonText="Go to Dashboard" isButtonAllow={true} handleButtonCallBack={handleHeadingButtonClick} buttonLoading={buttonLoading}/>
        {
            dataLoading ? <TableSkeleton/>: <ServiceListingCustomer  data={serviceList || []}/> 
        }

        <HeadingTemplate headingTab="Incidents" buttonText="New Service" isButtonAllow={false} handleButtonCallBack={handleHeadingButtonClick} buttonLoading={buttonLoading} />
        {
            incident.dataLoading ? <TableSkeleton/>: incident.dataList.map((item) => (<IncidentUpdate key={item.incidentID} data={item}/>)) 
        }
      </MainMenuTemplate>
    </>
  }
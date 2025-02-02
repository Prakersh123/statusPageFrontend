/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/CreateServiceDialogContent.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 5:36:45 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */
"use client"; // Required for shadcn/ui components

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from "@/lib/axiosHelper";
import useApi from "@/hooks/use-api";
import { CardSkeleton } from "../commonUI/CardSkeleton";
import { ServiceStatusButtons } from "../commonUI/ServiceStatusButtons";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
const visibility = [
  { value: "users", label: "Users" },
  { value: "Guests", label: "Guests" },
  { value: "Always Hidden", label: "Always Hidden" },
];

const colapsed = [
  { value: "expanded", label: "Always Expanded" },
  { value: "collapsed", label: "Always Collapsed" },
];
export const CreateServiceDialogContent = ({ saveChanges, initialData={} , isUpdateClicked = false}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    serviceGroup: initialData.serviceGroup || "",
    status: initialData.status || false,
    stage: initialData.stage || '',
    description: initialData.description || ""
  });
  const [buttonData, setButtonData] = useState({
    loading: false,
    disabled: false
  });
  const apiCall = useApi({
    url: '/service-group/list',
    method: 'GET',
  }); 

  const { toast } = useToast()
  const [errors, setErrors] = useState({});

// useEffect(()=>{}, [initialData]); 

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.visibility) newErrors.visibility = "Visibility selection is required";
    if (!formData.colapsed) newErrors.colapsed = "Collapsed selection is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleServiceGroupChange = (value) => {
    setFormData({ ...formData, serviceGroup: value });
    setErrors({ ...errors, serviceGroup: "" });
  };
  const handleStageSelection = (value) => {
    setFormData({ ...formData, stage: value });
    setErrors({ ...errors, stage: '' });
    
  }

  const handleSubmit = async () => {
    console.log(formData);
    if (validateForm() || 5) {
      setButtonData({
        disabled: true,
        loading: true
      });
      try {
        const data = {
          name: formData.name,
          status: formData.status,
          stage: formData.stage,
          serviceGroupID: formData.serviceGroup,
          description: formData.description
        }
        if (isUpdateClicked) {
          await axiosInstance.put('/service', {...data, serviceID: initialData.serviceID});
        } else 
        {
          await axiosInstance.post('/service', data);
        }

        toast({
          title: "Service Added",
          description: `${formData.name} got added!`,
          durattion: 3000
        })
        saveChanges(formData);
      } catch(error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      } finally {
        setButtonData({
          disabled: false,
          loading: false
        });
      }


    }
  };

  return (
    <>
      {apiCall.loading ? <CardSkeleton />:
    <div className="space-y-4">
      {/* Name Field */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          name="name" 
          type="text" 
          placeholder="Enter name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Visibility Selection */}
      <div>
        <Label htmlFor="selectGroup">Service Group</Label>
        <Select onValueChange={handleServiceGroupChange} value={formData.serviceGroup}>
          <SelectTrigger id="selectGroup">
            <SelectValue placeholder="Select the Group" />
          </SelectTrigger>
          <SelectContent>
            {apiCall.data.listItems.map((item) => (
              <SelectItem key={item.serviceGroupID} value={item.serviceGroupID}>
                {item.serviceGroupName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.Visibility && <p className="text-red-500 text-sm">{errors.Visibility}</p>}
      </div>

      {/* Visibility Selection */}
      <div >
        <Label htmlFor="name">Current Stage</Label>
          <ServiceStatusButtons selectHandle={handleStageSelection} defaultValue={formData.stage}/>
      </div>

      <div className="flex items-center">
        <Label htmlFor="airplane-mode" className="mr-2" >Enable/Disable</Label>            
        <Switch id="airplane-mode" checked={formData.status} onCheckedChange={(v)=>{setFormData({...formData, status: v})}}/>
      </div>
      <div>
      <Label htmlFor="description">Description</Label>
      <Textarea placeholder="Description" id="description" name="description" value={formData.description} onChange={handleChange}/>
      </div>

      {/* Submit Button */}
      <Button className="w-full" onClick={handleSubmit} disabled={buttonData.disabled}>
{buttonData.loading? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
      </Button>
    </div>
 } </>
  
  );
};

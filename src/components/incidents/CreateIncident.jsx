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
import { IncidentStatusButtons } from "../commonUI/IncidentStatusButtons";
import DateTimeInput from "../commonUI/CustomDateTimInput";
import { comment } from "postcss";
const visibility = [
  { value: "users", label: "Users" },
  { value: "Guests", label: "Guests" },
  { value: "Always Hidden", label: "Always Hidden" },
];

const colapsed = [
  { value: "expanded", label: "Always Expanded" },
  { value: "collapsed", label: "Always Collapsed" },
];
export const CreateIncident = ({ saveChanges, initialData, isUpdateClicked }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    serviceGroup: initialData.serviceGroup || "",
    stage: initialData.stage || "",
    description: initialData.description || "",
    comment: initialData.comment || ""

  });

  const [selectedDateTime, setSelectedDateTime] = useState("" || '');

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDateTime(date);
  };


  const [buttonData, setButtonData] = useState({
    loading: false,
    disabled: false
  });
  const apiCall = useApi({
    url: '/service/list',
    method: 'GET',
  }); 

  const { toast } = useToast()
  const [errors, setErrors] = useState({});



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

  const handleServiceChange = (value) => {
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
          description: formData.description,
          serviceID: formData.serviceGroup,
          stage: formData.stage,
          comments: formData.comment,
          dateTimeValue: Date(selectedDateTime)
        }
        if (isUpdateClicked) {
          await axiosInstance.put('/incident', {...data, incidentID: initialData.incidentID});
        } else 
        {
          await axiosInstance.post('/incident',   data);
        }

        toast({
          title: "Service Added",
          description: `${formData.name} got added!`,
          durattion: 3000
        })
        saveChanges(formData);
      } catch(error) {

        console.log(error);
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

      <div>
      <Label htmlFor="description">Description</Label>
      <Textarea placeholder="Description" id="description" name="description" value={formData.description} onChange={handleChange}/>
      </div>
      {/* Visibility Selection */}
      <div>
        <Label htmlFor="selectGroup">Service</Label>
        <Select onValueChange={handleServiceChange} value={formData.serviceGroup}>
          <SelectTrigger id="selectGroup">
            <SelectValue placeholder="Select the service" />
          </SelectTrigger>
          <SelectContent>
            {apiCall.data.listItems.map((item) => (
              <SelectItem key={item.serviceID} value={item.serviceID}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.Visibility && <p className="text-red-500 text-sm">{errors.Visibility}</p>}
      </div>

      {/* Visibility Selection */}
      <div >
        <Label htmlFor="name">Current Stage</Label>
          <IncidentStatusButtons selectHandle={handleStageSelection} defaultValue={formData.stage}/>
      </div>
      <div>
      <Label htmlFor="comment">Comments</Label>
      <Textarea placeholder="Add Comments for stage change if required" id="comment" name="comment" value={formData.comment} onChange={handleChange}/>
      </div>
      <DateTimeInput
        label="Occured at"
        value={selectedDateTime}
        onChange={handleDateChange}
        onSubmit={handleSubmit}
        buttonText="Submit"
      />


      {/* Submit Button */}
      <Button className="w-full" onClick={handleSubmit} disabled={buttonData.disabled}>
{buttonData.loading? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
      </Button>
    </div>
 } </>
  
  );
};

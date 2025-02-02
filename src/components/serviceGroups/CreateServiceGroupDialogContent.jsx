/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/CreateServiceGroupDialogContent.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 5:36:45 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */
"use client"; // Required for shadcn/ui components

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from "@/lib/axiosHelper";
const visibility = [
  { value: "users", label: "Users" },
  { value: "guests", label: "Guests" },
  { value: "alwayshidden", label: "Always Hidden" },
];

const colapsed = [
  { value: false, label: "Always Expanded" },
  { value: true, label: "Always Collapsed" },
];
export const CreateServiceGroupDialogContent = ({ saveChanges,  initialData={} , isUpdateClicked = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    visibility: initialData.visibility || "",
    colapsed: initialData.colapsed || ""
  });
  const [buttonData, setButtonData] = useState({
    loading: false,
    disabled: false
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

  const handleVisibilityChange = (value) => {
    setFormData({ ...formData, visibility: value });
    setErrors({ ...errors, visibility: "" });
  };
  const handleCollapsedChange = (value) => {
    setFormData({ ...formData, colapsed: value });
    setErrors({ ...errors, colapsed: "" });
  };

  const handleSubmit = async () => {

    if (validateForm() || 5) {
      setButtonData({
        disabled: true,
        loading: true
      });
      try {
        const data = 
          {
            name: formData.name,
            visibility: formData.visibility,
            collapsed: formData.colapsed
          }
        
          if (isUpdateClicked) {
            await axiosInstance.put('/service-group', {...data, serviceGroupID: initialData.serviceGroupID});
          } else 
          {
            await axiosInstance.post('/service-group', data);
          }
        // await axiosInstance.post('/service-group', {
        //   name: formData.name,
        //   visibility: formData.visibility,
        //   collapsed: formData.colapsed
        // });
        toast({
          title: "Group Added",
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
        <Label htmlFor="Visibility">Visibility</Label>
        <Select onValueChange={handleVisibilityChange} value={formData.visibility}>
          <SelectTrigger id="Visibility">
            <SelectValue placeholder="Select a Visibility" />
          </SelectTrigger>
          <SelectContent>
            {visibility.map((Visibility) => (
              <SelectItem key={Visibility.value} value={Visibility.value}>
                {Visibility.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.Visibility && <p className="text-red-500 text-sm">{errors.Visibility}</p>}
      </div>

      {/* Visibility Selection */}
      <div>
        <Label htmlFor="colapsed">Collapsed</Label>
        <Select onValueChange={handleCollapsedChange} value={formData.colapsed}>
          <SelectTrigger id="colapsed">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {colapsed.map((colapsed) => (
              <SelectItem key={colapsed.value} value={colapsed.value}>
                {colapsed.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.colapsed && <p className="text-red-500 text-sm">{errors.colapsed}</p>}
      </div>

      {/* Submit Button */}
      <Button className="w-full" onClick={handleSubmit} disabled={buttonData.disabled}>
{buttonData.loading? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
      </Button>
    </div>
  );
};

/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/login-form.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 9:22:33 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import useApi from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/axiosHelper"

export function LoginForm({
  className,
  ...props
}) {

  const [formData, setFormData] = useState({
    emailID: '',
    password: ''
  });
  const [buttonData, setButtonData] = useState({
      loading: false,
      disabled: false
    });
  const { toast } = useToast()
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    console.log(formData);
      setButtonData({
        disabled: true,
        loading: true
      });
      try {
      
          let response = await axiosInstance.post('/user/login', {
            emailID: formData.emailID,
            password: formData.password
          });
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType)
          navigate('/')
        
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
  
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form> */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" name="emailID" required value={formData.emailID} onChange={handleChange}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password"  name="password" required value={formData.password} onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
              <Button variant="outline" className="w-full" >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>)
  );
}

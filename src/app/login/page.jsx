/*
 * Filename: /home/codestax/statusPage/vite-project/src/app/login/page.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 9:22:33 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { LoginForm } from "@/components/login-form"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);
  return (
    (<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>)
  );
}

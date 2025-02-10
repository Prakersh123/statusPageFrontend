/*
 * Filename: /home/codestax/statusPage/vite-project/src/hooks/use-api.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 9:51:20 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */


export default function useView() {
  
    const role = localStorage.getItem('userType');
    const editAllowed = role == 'viewer'? false:true;

  return { editAllowed };
}
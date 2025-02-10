/*
 * Filename: /home/codestax/statusPage/vite-project/src/routes/index.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 3:12:04 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import CustomerScreen from '@/app/dashboard/CustomerScreen.jsx';
import HomeDashboard from '@/app/dashboard/HomeDashboard.jsx';
import Incidents from '@/app/dashboard/Incidents.jsx';
import ServiceGroups from '@/app/dashboard/ServiceGroups.jsx';
import Services from '@/app/dashboard/Services.jsx';
import Layout from '@/app/layout.jsx';
import LoginPage from '@/app/login/page.jsx';
import { lazy } from 'react';

// Lazy load pages for better performance
const UserManagment = lazy(() => import('../app/dashboard/userManagment.jsx'));

const value = localStorage.getItem('userType');
const getView = (value) => {
  switch(value) {
    case 'viewer':
      return false;
    default:
      return true;
  }
}

// Define your routes
const routes = [

  {
    path: '/',
    element: <Layout><HomeDashboard/></Layout>,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: 'service-groups',
    element: <Layout><ServiceGroups userType={getView(value)}></ServiceGroups></Layout>,
  },
  {
    path: 'services',
    element: <Layout><Services></Services></Layout>,
  },
  {
    path: 'incidents',
    element: <Layout><Incidents></Incidents></Layout>,
  },
  {
    path: 'user-managment',
    element: <Layout><UserManagment></UserManagment></Layout>,
  },
  {
    path: '/customer',
    element: <CustomerScreen />,
  },
//   {
//     path: '/contact',
//     element: <Contact />,
//   },
//   {
//     path: '*', // Catch-all route for 404 pages
//     element: <NotFound />,
//   },
];

export default routes;
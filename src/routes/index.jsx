/*
 * Filename: /home/codestax/statusPage/vite-project/src/routes/index.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 3:12:04 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import HomeDashboard from '@/app/dashboard/HomeDashboard.jsx';
import Incidents from '@/app/dashboard/Incidents.jsx';
import ServiceGroups from '@/app/dashboard/ServiceGroups.jsx';
import Services from '@/app/dashboard/Services.jsx';
import Layout from '@/app/layout.jsx';
import { lazy } from 'react';

// Lazy load pages for better performance
const UserManagment = lazy(() => import('../app/dashboard/userManagment.jsx'));


// Define your routes
const routes = [

  {
    path: '/',
    element: <Layout><HomeDashboard/></Layout>,
  },

  {
    path: 'service-groups',
    element: <Layout><ServiceGroups></ServiceGroups></Layout>,
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
    path: 'settings',
    element: <Layout><UserManagment></UserManagment></Layout>,
  },
  {
    path: 'user-managment',
    element: <Layout><UserManagment></UserManagment></Layout>,
  },
//   {
//     path: '/about',
//     element: <About />,
//   },
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
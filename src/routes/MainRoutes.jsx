import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';


// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Employees = Loadable(lazy(() => import('pages/component-overview/employees')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const EmployeeRegister = Loadable(lazy(() => import('pages/component-overview/employeeRegister'))); //EmployeeRegister
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'face-detection',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: 'registration',
      element: <EmployeeRegister />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'employees',
      element: <Employees />
    },
   
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;

// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'Detections',
  title: 'Detections',
  type: 'group',
  children: [
    {
      id: 'face-detection',
      title: 'Face Detection',
      type: 'item',
      url: '/face-detection',
      icon: icons.LoginOutlined,
      breadcrumbs:false
    },
    {
      id: 'register1',
      title: 'Employees',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      breadcrumbs:false
    
    },
 
    {
      id: 'register1',
      title: 'Employee Registration',
      type: 'item',
      url: '/registration',
      icon: icons.ProfileOutlined,
      breadcrumbs:false
     
    },
    // {
    //   id: 'employees',
    //   title: 'View employee attendance',
    //   type: 'item',
    //   url: '/employees',
    //   icon: icons.ProfileOutlined,
     
    // }
  ]
};

export default pages;

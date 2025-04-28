// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'notification',
  title: 'Notifications',
  type: 'group',
  children: [
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined,
      breadcrumbs:false
    },
   
  ]
};

export default support;

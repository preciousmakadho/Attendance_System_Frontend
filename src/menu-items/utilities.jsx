// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Breadcrumb } from 'antd';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'analytics',
  title: 'Analytics',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Analytics',
      type: 'item',
      url: '/typography',
      icon: icons.FontSizeOutlined,
      breadcrumbs:false
    },
   
  ]
};

export default utilities;

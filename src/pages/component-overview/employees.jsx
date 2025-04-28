import React, { useState } from 'react';
import { 
  Layout, 
  Input, 
  Select, 
  DatePicker, 
  Table, 
  Tag, 
  Typography, 
  Button, 
  Space, 
  Avatar 
} from 'antd';
import { 
  SearchOutlined, 
  MoreOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Link } = Typography;
const { Option } = Select;

const EmployeeAttendanceDashboard = () => {
  // Sample employee data
  const employeeData = [
    { 
      key: '1',
      name: 'John Smith', 
      position: 'Senior Developer', 
      department: 'Engineering', 
      status: 'Present', 
      checkIn: '9:05 AM', 
      checkOut: '--' 
    },
    { 
      key: '2',
      name: 'Sarah Johnson', 
      position: 'Marketing Manager', 
      department: 'Marketing', 
      status: 'Present', 
      checkIn: '9:12 AM', 
      checkOut: '--' 
    },
    { 
      key: '3',
      name: 'Michael Brown', 
      position: 'HR Specialist', 
      department: 'HR', 
      status: 'Absent', 
      checkIn: '--', 
      checkOut: '--' 
    },
    { 
      key: '4',
      name: 'Emily Davis', 
      position: 'Financial Analyst', 
      department: 'Finance', 
      status: 'Late', 
      checkIn: '9:45 AM', 
      checkOut: '--' 
    },
    { 
      key: '5',
      name: 'David Wilson', 
      position: 'Frontend Developer', 
      department: 'Engineering', 
      status: 'Present', 
      checkIn: '8:55 AM', 
      checkOut: '--' 
    }
  ];

  // Table columns configuration
  const columns = [
    {
      title: 'EMPLOYEE',
      dataIndex: 'employee',
      key: 'employee',
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#f0f2f5', color: '#bfbfbf' }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ color: '#8c8c8c' }}>{record.position}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'DEPARTMENT',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'Absent') {
          color = 'red';
        } else if (status === 'Late') {
          color = 'gold';
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'CHECK IN',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'CHECK OUT',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button type="text" icon={<MoreOutlined />} />
      ),
    },
  ];

  return (
    <Layout style={{ background: '#fff' }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>


      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ display: 'flex', marginBottom: '20px', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '8px' }}>Search</div>
            <Input 
              placeholder="Search by name or ID..." 
              prefix={<SearchOutlined />} 
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '8px' }}>Department</div>
            <Select defaultValue="all" style={{ width: '100%' }}>
              <Option value="all">All Departments</Option>
              <Option value="engineering">Engineering</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="hr">HR</Option>
              <Option value="finance">Finance</Option>
            </Select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '8px' }}>Date</div>
            <DatePicker 
              format="DD/MM/YYYY" 
              style={{ width: '100%' }}
              placeholder="dd/mm/yyyy"
              suffixIcon={<CalendarOutlined />}
            />
          </div>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={employeeData} 
          pagination={{ 
            position: ['bottomRight'],
            showSizeChanger: false,
            showTotal: (total, range) => `Page 1 of 5`,
            itemRender: (page, type) => {
              if (type === 'prev') return <Button>Previous</Button>;
              if (type === 'next') return <Button>Next</Button>;
              return null;
            }
          }} 
          style={{ marginTop: '10px' }}
        />
      </Content>
    </Layout>
  );
};

export default EmployeeAttendanceDashboard;
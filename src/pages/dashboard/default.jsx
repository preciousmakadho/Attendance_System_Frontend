import React from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Menu, 
  Progress, 
  Space, 
  Badge, 
  List, 
  Avatar,
  Input
} from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  BarChartOutlined, 
  BellOutlined, 
  SettingOutlined, 
  SearchOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  WifiOutlined,
  DisconnectOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const DashboardDefault = () => {
  // Sample data
  const attendanceData = {
    present: 42,
    absent: 7,
    late: 3,
    rate: 85
  };

  const systemStatus = [
    { name: 'Main Entrance Camera', status: 'Online', icon: <WifiOutlined /> },
    { name: 'Side Entrance Camera', status: 'Offline', icon: <DisconnectOutlined /> },
    { name: 'Recognition Server', status: 'Online', icon: <WifiOutlined /> },
    { name: 'WhatsApp API', status: 'Connected', icon: <WifiOutlined /> },
  ];

  const recentActivity = [
    { name: 'John Smith', department: 'Engineering', time: '9:05 AM', checkType: 'in' },
    { name: 'Sarah Johnson', department: 'Marketing', time: '9:12 AM', checkType: 'in' },
    { name: 'Michael Brown', department: 'HR', time: '5:30 PM', checkType: 'out' },
    { name: 'Emily Davis', department: 'Finance', time: '9:45 AM', checkType: 'in' },
  ];

  const departmentAttendance = [
    { name: 'Engineering', present: 18, total: 20 },
    { name: 'Marketing', present: 12, total: 15 },
    { name: 'Finance', present: 8, total: 10 },
    { name: 'HR', present: 4, total: 5 },
    { name: 'Operations', present: 7, total: 10 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online':
        return 'success';
      case 'Connected':
        return 'success';
      case 'Offline':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
    <Content style={{ padding: '24px', background: '#f0f2f5' }}>
      {/* Top Row - Three equal width cards */}
      <Row gutter={[24, 24]}>
        {/* Today's Attendance */}
        <Col xs={24} md={8}>
          <Card title="Today&apos;s Attendance" bordered={false} style={{ height: '100%' }}>
            <Text type="secondary">Overview of employee attendance</Text>
            <Row gutter={16} style={{ marginTop: '20px', textAlign: 'center' }}>
              <Col span={8}>
                <CheckCircleFilled style={{ fontSize: '28px', color: '#52c41a' }} />
                <Title level={2} style={{ margin: '8px 0' }}>{attendanceData.present}</Title>
                <Text type="secondary">Present</Text>
              </Col>
              <Col span={8}>
                <CloseCircleFilled style={{ fontSize: '28px', color: '#f5222d' }} />
                <Title level={2} style={{ margin: '8px 0' }}>{attendanceData.absent}</Title>
                <Text type="secondary">Absent</Text>
              </Col>
              <Col span={8}>
                <ClockCircleFilled style={{ fontSize: '28px', color: '#faad14' }} />
                <Title level={2} style={{ margin: '8px 0' }}>{attendanceData.late}</Title>
                <Text type="secondary">Late</Text>
              </Col>
            </Row>
            <div style={{ marginTop: '20px' }}>
              <Text>Attendance Rate</Text>
              <Progress percent={attendanceData.rate} showInfo={false} strokeColor="#1890ff" />
              <div style={{ textAlign: 'right' }}>{attendanceData.rate}%</div>
            </div>
          </Card>
        </Col>
        
        {/* System Status */}
        <Col xs={24} md={8}>
          <Card title="System Status" bordered={false} style={{ height: '100%' }}>
            <Text type="secondary">Status of recognition systems</Text>
            <List
              style={{ marginTop: '16px' }}
              itemLayout="horizontal"
              dataSource={systemStatus}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.name}
                  />
                  <Badge status={getStatusColor(item.status)} text={item.status} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        {/* Recent Activity */}
        <Col xs={24} md={8}>
          <Card title="Recent Activity" bordered={false} style={{ height: '100%' }}>
            <Text type="secondary">Latest employee check-ins and check-outs</Text>
            <List
              style={{ marginTop: '16px' }}
              itemLayout="horizontal"
              dataSource={recentActivity}
              renderItem={item => (
                <List.Item
                  extra={
                    <Space>
                      <Text>{item.time}</Text>
                      <ArrowRightOutlined style={{ color: item.checkType === 'in' ? '#52c41a' : '#1890ff' }} />
                    </Space>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                    description={item.department}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Bottom Row - Two equal width cards */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        {/* Weekly Attendance */}
        <Col xs={24} md={12}>
          <Card title="Weekly Attendance" bordered={false} style={{ height: '100%' }}>
            <Text type="secondary">Attendance trends for the current week</Text>
            <div style={{ marginTop: '30px' }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space>
                  <Badge color="black" />
                  <span>Present 85%</span>
                  
                  <Badge color="#f5222d" style={{ marginLeft: '20px' }} />
                  <span>Absent 10%</span>
                  
                  <Badge color="#faad14" style={{ marginLeft: '20px' }} />
                  <span>Late 5%</span>
                </Space>
                <Progress 
                  percent={100}
                  success={{ percent: 85 }}
                  trailColor="#faad14"
                  strokeColor="#f5222d"
                  showInfo={false}
                />
              </Space>
            </div>
          </Card>
        </Col>
        
        {/* Department Attendance */}
        <Col xs={24} md={12}>
          <Card title="Department Attendance" bordered={false} style={{ height: '100%' }}>
            <Text type="secondary">Today&apos;s attendance by department</Text>
            <div style={{ marginTop: '20px' }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {departmentAttendance.map(dept => (
                  <div key={dept.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <Text>{dept.name}</Text>
                      <Text>{dept.present}/{dept.total}</Text>
                    </div>
                    <Progress 
                      percent={(dept.present / dept.total) * 100} 
                      showInfo={false}
                      strokeColor="#1890ff"
                    />
                  </div>
                ))}
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
  );
};

export default DashboardDefault;
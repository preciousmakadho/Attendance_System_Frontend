import React, { useState } from 'react';
import { Tabs, Card, List, Tag, Switch, Input, Button, Space, Row, Col } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const samplePage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [whatsappApiKey, setWhatsappApiKey] = useState('••••••••••••••');
  
  // Event notification settings
  const [events, setEvents] = useState({
    checkIns: true,
    checkOuts: true,
    absences: true,
    lateArrivals: true,
    systemAlerts: true
  });

  // Recipients data
  const [teamLeads, setTeamLeads] = useState([
    { id: 1, name: 'John Smith', department: 'Engineering' },
    { id: 2, name: 'Sarah Johnson', department: 'Marketing' }
  ]);
  
  const [hrManagers, setHrManagers] = useState([
    { id: 1, name: 'Lisa Brown', department: 'HR' }
  ]);
  
  const notificationLogs = [
    { 
      id: 1, 
      message: 'Sarah Johnson checked in at 9:12 AM', 
      recipient: 'Team Lead (John)', 
      time: '9:12 AM', 
      status: 'Delivered',
      type: 'success'
    },
    { 
      id: 2, 
      message: 'Michael Brown is absent today', 
      recipient: 'HR Manager (Lisa)', 
      time: '10:00 AM', 
      status: 'Delivered',
      type: 'error'
    },
    { 
      id: 3, 
      message: 'Emily Davis arrived late at 9:45 AM', 
      recipient: 'Team Lead (John)', 
      time: '9:45 AM', 
      status: 'Delivered',
      type: 'warning'
    },
    { 
      id: 4, 
      message: 'David Wilson checked in at 8:55 AM', 
      recipient: 'Team Lead (John)', 
      time: '8:55 AM', 
      status: 'Failed',
      type: 'success'
    },
    { 
      id: 5, 
      message: 'Side Entrance Camera is offline - please check', 
      recipient: 'Admin (Alex)', 
      time: '8:30 AM', 
      status: 'Delivered',
      type: 'error'
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
      case 'warning':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return null;
    }
  };

  const getStatusTag = (status) => {
    return (
      <Tag color={status === 'Delivered' ? 'success' : 'error'}>
        {status}
      </Tag>
    );
  };
  
  const removeRecipient = (type, id) => {
    if (type === 'teamLead') {
      setTeamLeads(teamLeads.filter(lead => lead.id !== id));
    } else if (type === 'hrManager') {
      setHrManagers(hrManagers.filter(manager => manager.id !== id));
    }
  };

  const handleEventToggle = (eventKey) => {
    setEvents(prev => ({
      ...prev,
      [eventKey]: !prev[eventKey]
    }));
  };

  const renderChannelsTab = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>WhatsApp</div>
            <div style={{ color: '#666', fontSize: '14px' }}>Send notifications via WhatsApp</div>
          </div>
          <Switch checked={whatsappEnabled} onChange={setWhatsappEnabled} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Email</div>
            <div style={{ color: '#666', fontSize: '14px' }}>Send notifications via email</div>
          </div>
          <Switch checked={emailEnabled} onChange={setEmailEnabled} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>SMS</div>
            <div style={{ color: '#666', fontSize: '14px' }}>Send notifications via SMS</div>
          </div>
          <Switch checked={smsEnabled} onChange={setSmsEnabled} />
        </div>
        
        <div style={{ marginTop: 24, marginBottom: 8 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>WhatsApp API Key</div>
          <Input.Password
            value={whatsappApiKey}
            onChange={(e) => setWhatsappApiKey(e.target.value)}
            style={{ marginBottom: 24 }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">Save Changes</Button>
          </Space>
        </div>
      </div>
    );
  };

  const renderEventsTab = () => {
    const eventSettings = [
      {
        key: 'checkIns',
        title: 'Check-ins',
        description: 'Notify when employees check in'
      },
      {
        key: 'checkOuts',
        title: 'Check-outs',
        description: 'Notify when employees check out'
      },
      {
        key: 'absences',
        title: 'Absences',
        description: 'Notify when employees are absent'
      },
      {
        key: 'lateArrivals',
        title: 'Late Arrivals',
        description: 'Notify when employees arrive late'
      },
      {
        key: 'systemAlerts',
        title: 'System Alerts',
        description: 'Notify on system issues (camera offline, etc.)'
      }
    ];

    return (
      <div style={{ padding: '20px 0' }}>
        {eventSettings.map((setting) => (
          <div 
            key={setting.key}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 24
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold' }}>{setting.title}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{setting.description}</div>
            </div>
            <Switch 
              checked={events[setting.key]} 
              onChange={() => handleEventToggle(setting.key)}
            />
          </div>
        ))}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">Save Changes</Button>
          </Space>
        </div>
      </div>
    );
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Notification Logs" extra={<span>Recent notifications sent to supervisors</span>}>
          <List
            itemLayout="horizontal"
            dataSource={notificationLogs}
            renderItem={(item) => (
              <List.Item 
                extra={getStatusTag(item.status)}
              >
                <List.Item.Meta
                  avatar={getIcon(item.type)}
                  title={item.message}
                  description={<>To: {item.recipient}<span style={{ float: 'right' }}>{item.time}</span></>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Notification Settings" extra={<span>Configure how notifications are sent</span>}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Channels" key="1">
              {renderChannelsTab()}
            </TabPane>
            <TabPane tab="Recipients" key="2">
              <div>
                <h4>Team Leads</h4>
                {teamLeads.map(lead => (
                  <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Input 
                      value={`${lead.name} (${lead.department})`} 
                      readOnly
                      style={{ marginRight: 10 }}
                    />
                    <Button onClick={() => removeRecipient('teamLead', lead.id)}>Remove</Button>
                  </div>
                ))}
                <Button style={{ marginBottom: 20 }}>Add Team Lead</Button>
                
                <h4>HR Managers</h4>
                {hrManagers.map(manager => (
                  <div key={manager.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Input 
                      value={`${manager.name} (${manager.department})`} 
                      readOnly
                      style={{ marginRight: 10 }}
                    />
                    <Button onClick={() => removeRecipient('hrManager', manager.id)}>Remove</Button>
                  </div>
                ))}
                <Button style={{ marginBottom: 20 }}>Add HR Manager</Button>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <Space>
                    <Button>Cancel</Button>
                    <Button type="primary">Save Changes</Button>
                  </Space>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Events" key="3">
              {renderEventsTab()}
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default samplePage
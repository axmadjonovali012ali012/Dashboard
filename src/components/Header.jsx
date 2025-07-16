import React from 'react';
import { Layout, Row, Col, Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Img1 from '../assets/Img1.png'
import { SettingOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import LoginPage from '../pages/LoginPage';




const { Header } = Layout;

const AppHeader = ({ onLogout }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    const menu = (
        <Menu
            theme="dark"
        >
            <Menu.Item key="profile" icon={<UserOutlined />}>
                My Profile
            </Menu.Item>

            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                }}
            >
                Log Out
            </Menu.Item>
        </Menu>
    );



    return (
        <Header style={{ backgroundColor: '#f5f6fa', padding: '0 24px' }}>
            <Row justify="space-between" align="middle">
                <Col style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Input.Search
                        placeholder="Search..."
                        allowClear
                        style={{ width: 300, marginBottom: 24, marginTop: '15px', borderRadius: '20%' }}
                        onSearch={(value) => console.log("Searching for:", value)}
                    />

                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '50px' }}>
                    < SettingOutlined style={{ fontSize: '20px', backgroundColor: '#f5f6fb ', padding: '10px' }} />
                    < MessageOutlined style={{ fontSize: '20px', backgroundColor: '#f5f6fb ', padding: '10px' }} />
                    < GlobalOutlined style={{ fontSize: '20px', backgroundColor: '#f5f6fb ', padding: '10px' }} />
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar size="large" style={{ cursor: 'pointer' }} >
                            <img src={Img1} alt="" />
                        </Avatar>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    );
};

export default AppHeader;

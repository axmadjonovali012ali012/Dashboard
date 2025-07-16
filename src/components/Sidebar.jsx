import React, { useState } from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import {
    DashboardOutlined,
    TeamOutlined,
    UserOutlined,
    DollarOutlined,
    SettingOutlined,
    LogoutOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import Logo1 from '../assets/Logo1.png';
import './Sidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';





const { Sider } = Layout;

const Sidebar = ({ onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('_token');
        navigate('/login');
    };


    return (
        <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            width={220}
            style={{
                backgroundColor: '#000',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
            
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 16,
                    justifyContent: collapsed ? 'center' : 'space-between',
                }}
            >
                <img src={Logo1} alt="Logo" style={{ width: 32, height: 32 }} />
                {!collapsed && <span style={{ color: '#fff', fontWeight: 'bold', marginRight: '15px', fontSize: '18px' }}>SmartBog'cha</span>}
            </div>

            <div style={{ flex: 1 }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    className="custom-menu"
                    style={{ backgroundColor: 'black' }}
                >

                    <Menu.Item key="/" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>

                    <Menu.Item key="/teachers" icon={<UserOutlined />}>
                        <Link to="/teachers">Teachers</Link>
                    </Menu.Item>

                    <Menu.Item key="/students" icon={<TeamOutlined />}>
                        <Link to="/students">Students</Link>
                    </Menu.Item>

                    <Menu.SubMenu key="finance" icon={<DollarOutlined />} title="Finance">
                        <Menu.Item key="/finance">
                            <Link to="/finance">Finance</Link>
                        </Menu.Item>
                        <Menu.Item key="/calendar">
                            <Link to="/calendar">Calendar</Link>
                        </Menu.Item>
                        <Menu.Item key="/message">
                            <Link to="/message">Message</Link>
                        </Menu.Item>
                        <Menu.Item key="/timetable">
                            <Link to="/timetable">Time Table</Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.Item key="/settings" icon={<SettingOutlined />}>
                        <Link to="/settings">Settings</Link>
                    </Menu.Item>

                </Menu>
            </div>

            <div
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    position: 'fixed',
                    top: 70,
                    left: collapsed ? 80 : 220,
                    background: '#fff',
                    padding: 6,
                    borderRadius: '0 6px 6px 0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    cursor: 'pointer',
                    transition: 'left 0.3s ease',
                }}
            >
                <Tooltip title={collapsed ? 'Open Menu' : 'Close Menu'}>
                    {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                </Tooltip>
            </div>

            <div
                onClick={handleLogout}
                style={{
                    padding: collapsed ? '10px' : '10px 28px',
                    textAlign: collapsed ? 'center' : 'left',
                    cursor: 'pointer',
                    backgroundColor: '#000',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: 14,
                    width: collapsed ? 48 : 210,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    margin: '12px auto',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                }}
            >
                <LogoutOutlined style={{ marginRight: collapsed ? 0 : 8, fontSize: 14 }} />
                {!collapsed && 'Log Out'}
            </div>

        </Sider>
    );
};

export default Sidebar;

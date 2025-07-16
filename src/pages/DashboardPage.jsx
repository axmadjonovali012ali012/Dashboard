import React, { useState } from 'react';
import { Layout } from 'antd';
import { Progress } from 'antd';
import Sidebar from '../components/Sidebar';
import { Row, Col, Card, Typography, Button, Avatar, Divider, Calendar } from 'antd';
import {
    UserOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AssignmentsTable from '../pages/AssignmentsTable';
import Logo2 from '../assets/Logo2.png';
import { Modal, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FaMale, FaFemale } from 'react-icons/fa';
import Img1 from '../assets/Img1.png'
import Img2 from '../assets/Img2.png'
import Img3 from '../assets/Img3.png'
import Img4 from '../assets/Img4.png'
import Img5 from '../assets/Img5.png'
import AppHeader from '../components/Header';




const { Content } = Layout;
const { Title, Text } = Typography;

const data = [
    { name: 'Jan', income: 600000, expense: 500000 },
    { name: 'Feb', income: 800000, expense: 600000 },
    { name: 'Mar', income: 650000, expense: 450000 },
    { name: 'Apr', income: 750000, expense: 550000 },
    { name: 'May', income: 900000, expense: 700000 },
    { name: 'Jun', income: 780000, expense: 620000 },
    { name: 'Jul', income: 850000, expense: 670000 },
    { name: 'Aug', income: 830000, expense: 680000 },
    { name: 'Sep', income: 870000, expense: 690000 },
    { name: 'Oct', income: 950000, expense: 730000 },
    { name: 'Nov', income: 98000, expense: 50000 },
    { name: 'Dec', income: 590000, expense: 590000 },
];

const messages = [
    { name: 'Jane Cooper', time: '12:34 pm', text: "Don’t forget the lab report...", image: Img1 },
    { name: 'Kristin Watson', time: '12:34 pm', text: 'We do have maths test...', image: Img2 },
    { name: 'Jenny Wilson', time: '12:34 pm', text: 'What?', image: Img3 },
    { name: 'Brooklyn Sim', time: '12:34 pm', text: 'Did Sachin give any HW?', image: Img4 },
    { name: 'Darrell Steward', time: '12:34 pm', text: 'Can we go for a movie...', image: Img5 },
];


const DashboardPage = () => {
    const [notices, setNotices] = useState([
        { title: 'Sports Day Announcement', description: "The school's Annual Sports Day will be held on May 12." },
        { title: 'Summer Break Start Date', description: 'Break begins May 25, 2024. Have a wonderful holiday!' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '' });

    const handleAddNew = () => {
        setFormData({ title: '', description: '' });
        setEditIndex(null);
        setIsModalOpen(true);
    };

    const handleEdit = (index) => {
        setFormData(notices[index]);
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = (index) => {
        const updated = notices.filter((_, i) => i !== index);
        setNotices(updated);
        message.success('Deleted successfully');
    };

    const handleModalOk = () => {
        if (formData.title.trim() === '') return message.error('Title is required');

        const updatedNotices = [...notices];
        if (editIndex !== null) {
            updatedNotices[editIndex] = formData;
            message.success('Updated');
        } else {
            updatedNotices.push(formData);
            message.success('Added');
        }

        setNotices(updatedNotices);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };

    

    return (

        <Layout style={{ maxHeight: '100vh', overflow: 'hidden' }}>

            <Sidebar onLogout={handleLogout} />
            <Layout>
                <AppHeader />
                <Content style={{
                    margin: '24px', padding: '24px',
                    height: '100vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    background: '#f5f6fa',
                    padding: '24px',
                }}>
                    <Row gutter={[24, 24]}>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Col span={19}>
                                    <Card bordered={false} style={{ borderRadius: 16, height: 'auto', marginRight: 0 }}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Title style={{ fontSize: '20px' }} level={4}>Welcome, Laurel Higher Secondary School Team!</Title>
                                                <Text type="secondary" style={{ fontSize: '16px' }}>
                                                    Manage your school operations with ease. Stay updated on academics, attendance, finances, and more—all in one place. Let’s keep shaping a brighter future together!
                                                </Text>
                                            </div>
                                            <img src={Logo2} alt="" />
                                        </div>
                                    </Card>
                                </Col>

                                <Col span={5}>
                                    <Card bordered={false} style={{ borderRadius: 16, marginBottom: 16, height: '127px', backgroundColor: '#F8E38D' }}>
                                        <Row>
                                            <Col span={24}>
                                                <Title level={5}>Students</Title>
                                                <Text strong style={{ fontSize: 24 }}>5,909</Text>
                                            </Col>
                                        </Row>
                                    </Card>

                                    <Card bordered={false} style={{ borderRadius: 16, marginBottom: 16, height: '127px', backgroundColor: '#E2D8FC' }}>
                                        <Row>
                                            <Col span={24}>
                                                <Title level={5}>Teachers</Title>
                                                <Text strong style={{ fontSize: 24 }}>60</Text>
                                            </Col>
                                        </Row>
                                    </Card>

                                </Col>
                            </Row>



                            <Row gutter={16} style={{ marginTop: 24 }}>
                                <Col span={12}>
                                    <Card bordered={false} style={{ borderRadius: 16 }}>
                                        <Title style={{ fontSize: '20px' }} level={5}>Students</Title>

                                        <Row style={{ padding: '20px 0' }} justify="space-around" align="middle">
                                            <Col style={{ textAlign: 'center', }}>
                                                <Progress
                                                    type="circle"
                                                    percent={53}
                                                    width={140}
                                                    strokeWidth={12}
                                                    strokeColor="#8884d8"
                                                    format={() => (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FaMale style={{ fontSize: 30 }} />
                                                            <span>53%</span>
                                                        </div>
                                                    )}
                                                />
                                                <Text style={{ display: 'block', marginTop: 8, fontSize: '20px' }}>3,178 Boys</Text>
                                            </Col>
                                            <Col style={{ textAlign: 'center', padding: '20px 0' }}>
                                                <Progress
                                                    type="circle"
                                                    percent={47}
                                                    width={140}
                                                    strokeWidth={12}
                                                    strokeColor="#ffc658"
                                                    format={() => (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FaFemale style={{ fontSize: 30 }} />
                                                            <span>47%</span>
                                                        </div>
                                                    )}
                                                />
                                                <Text style={{ display: 'block', marginTop: 8, fontSize: '20px' }}>2,731 Girls</Text>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>


                                <Col span={12}>
                                    <Card bordered={false} style={{ borderRadius: 16 }}>
                                        <Title style={{ fontSize: '20px' }} level={5}>Notice Board</Title>

                                        <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                                            {notices.map((notice, index) => (
                                                <Card key={index} type="inner" style={{ marginBottom: 12, borderRadius: 8 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div>
                                                            <Text strong>{notice.title}</Text><br />
                                                            <Text type="secondary">{notice.description}</Text>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <EditOutlined style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />
                                                            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(index)} />
                                                        </div>
                                                    </div>

                                                </Card>

                                            ))}
                                            <Button
                                                icon={<PlusOutlined />}
                                                type="primary"
                                                style={{ marginBottom: 12 }}
                                                onClick={handleAddNew}
                                            >
                                                Add New
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>

                            </Row>

                            <Card bordered={false} style={{ borderRadius: 16, marginTop: 24 }}>
                                <Title style={{ fontSize: '20px' }} level={5}>Earnings</Title>
                                <ResponsiveContainer style={{ marginTop: '47px' }} width="100%" height={385}>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={3} />
                                        <Line type="monotone" dataKey="expense" stroke="#82ca9d" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>

                        </Col>

                        <Col span={8}>
                            <Row gutter={[16, 16]}>


                                <Col span={24}>
                                    <Card bordered={false} style={{ borderRadius: 16 }}>
                                        <Row justify="space-between" align="middle">
                                            <Title style={{ fontSize: '20px' }} level={5}>Calendar</Title>
                                            <Button type="default" size="small">Manage Calendar</Button>
                                        </Row>
                                        <Calendar fullscreen={false} style={{ marginTop: 12 }} />
                                    </Card>
                                </Col>

                                <Col span={24}>
                                    <Card bordered={false} style={{ borderRadius: 16 }}>
                                        <Title style={{ fontSize: '20px' }} level={5}>Financial Overview</Title>
                                        <Row justify="space-between">
                                            <Col style={{ backgroundColor: '#C3EBFA', padding: '20px', borderRadius: '10px' }}>
                                                <div><Text strong style={{ fontSize: 20 }}>₹29,545,000</Text></div>
                                                <Text type="secondary">Total Income</Text>
                                            </Col>
                                            <Col style={{ backgroundColor: '#C3EBFA', padding: '20px', borderRadius: '10px' }}>
                                                <div><Text strong style={{ fontSize: 20 }}>₹19,291,266</Text></div>
                                                <Text type="secondary">Total Expenses</Text>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>

                                <Col span={24}>
                                    <Card bordered={false} style={{ borderRadius: 16 }}>
                                        <Title style={{ fontSize: '20px' }} level={5}>Fee Status</Title>
                                        <Row justify="space-between">
                                            <Col style={{ border: '1px solid gainsboro', borderRadius: '10px', padding: '10px' }}><Text style={{ fontSize: '19px' }} >1,335</Text><Text type="success"> Paid</Text></Col>
                                            <Col style={{ border: '1px solid gainsboro', borderRadius: '10px', padding: '10px' }}><Text style={{ fontSize: '19px' }} >4,366</Text><Text type="warning"> Pending</Text></Col>
                                            <Col style={{ border: '1px solid gainsboro', borderRadius: '10px', padding: '10px' }}><Text style={{ fontSize: '19px' }} >208</Text><Text type="danger"> Overdue</Text></Col>
                                        </Row>
                                    </Card>
                                </Col>

                                <Col span={24}>
                                    <Card bordered={false} style={{ borderRadius: 16 }}>
                                        <Title level={5}>Messages</Title>
                                        {messages.map((msg, index) => (
                                            <Row key={index} align="middle" style={{ marginBottom: 16 }}>
                                                <Avatar
                                                    src={msg.image}
                                                    size={48}
                                                    style={{ marginRight: 12, border: '2px solid #f0f0f0' }}
                                                />
                                                <div>
                                                    <Text strong>{msg.name}</Text><br />
                                                    <Text type="secondary">{msg.text}</Text>
                                                </div>
                                            </Row>
                                        ))}
                                    </Card>

                                </Col>

                            </Row>

                        </Col>

                    </Row>
                    <Row>
                        <AssignmentsTable />
                    </Row>
                    <Modal
                        title={editIndex !== null ? 'Edit Notice' : 'Add Notice'}
                        open={isModalOpen}
                        onOk={handleModalOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Save"
                    >
                        <Input
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            style={{ marginBottom: 12 }}
                        />
                        <Input.TextArea
                            placeholder="Description"
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Modal>

                </Content>
            </Layout >
        </Layout >
    );
};

export default DashboardPage;



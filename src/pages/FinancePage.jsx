import React, { useState } from 'react';
import { Layout, Table, Card, Row, Col, Avatar, Tag, Space, Button, Input, Modal, Form } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chart from '../components/FeesChart';
import StudentAvatar from '../assets/Img2.png';

const { Content } = Layout;

const FinancePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(generateData());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    function generateData() {
        return Array.from({ length: 120 }, (_, i) => ({
            key: i,
            no: String(i + 1).padStart(2, '0'),
            name: 'Sophia Wilson',
            class: '12 - A',
            tuition: '₹80,000',
            hostel: '₹15,000',
            transport: '₹20,000',
            dayboarding: '₹15,000',
            total: '₹1,15,000',
            pending: '₹85,000',
            status: i % 3 === 0 ? 'Overdue' : i % 3 === 1 ? 'Pending' : 'Paid',
        }));
    }

    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const updatedData = data.map((item) =>
                item.key === editingRecord.key ? { ...item, ...values } : item
            );
            setData(updatedData);
            setIsModalOpen(false);
            setEditingRecord(null);
        });
    };

    const columns = [
        { title: 'No', dataIndex: 'no', key: 'no' },
        {
            title: 'Students',
            dataIndex: 'name',
            key: 'name',
            render: name => (
                <Space>
                    <Avatar src={StudentAvatar} />
                    {name}
                </Space>
            ),
        },
        { title: 'class', dataIndex: 'class', key: 'class' },
        { title: 'Tuition', dataIndex: 'tuition', key: 'tuition' },
        { title: 'Hostel', dataIndex: 'hostel', key: 'hostel' },
        { title: 'Transport', dataIndex: 'transport', key: 'transport' },
        { title: 'Day-Boarding', dataIndex: 'dayboarding', key: 'dayboarding' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        { title: 'Pending', dataIndex: 'pending', key: 'pending' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                let color = status === 'Paid' ? 'green' : status === 'Pending' ? 'orange' : 'red';
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <EyeOutlined />
                    <EditOutlined onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }} />
                    <DeleteOutlined onClick={() => handleDelete(record.key)} style={{ color: 'red', cursor: 'pointer' }} />
                </Space>
            ),
        },
    ];

    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ padding: '35px', background: '#f5f6fa', minHeight: '100vh' }}>
                    <h2 style={{ marginBottom: 24 }}>Fees Management</h2>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title="Fees Collection" bordered={false} style={{ borderRadius: 12 }}>
                                <Chart />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Fee Overview" bordered={false} style={{ borderRadius: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px', gap: '10px' }}>
                                    <div style={{ border: '1px solid #C3EBFA', borderRadius: '10px', padding: '5px 30px', backgroundColor: '#C3EBFA' }}>
                                        <div style={{ marginTop: '15px' }}>
                                            <h2> ₹3,500,000</h2>
                                            <p>Total Amount:</p>
                                        </div>
                                    </div>
                                    <div style={{ border: '1px solid #C3EBFA', borderRadius: '10px', padding: '5px 30px', backgroundColor: '#C3EBFA' }}>
                                        <div style={{ marginTop: '15px' }}>
                                            <h2> ₹1,200,000 </h2>
                                            <p>Total Hostel:</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px', gap: '10px', marginTop: '15px' }}>
                                    <div style={{ border: '1px solid #C3EBFA', borderRadius: '10px', padding: '5px 30px', backgroundColor: '#C3EBFA' }}>
                                        <div style={{ marginTop: '15px' }}>
                                            <h2> ₹2,000,000</h2>
                                            <p>Total Tution</p>
                                        </div>
                                    </div>
                                    <div style={{ border: '1px solid #C3EBFA', borderRadius: '10px', padding: '5px 30px', backgroundColor: '#C3EBFA' }}>
                                        <div style={{ marginTop: '15px' }}>
                                            <h2>₹3,000,000</h2>
                                            <p>Total Day</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Card
                        title="Fees Collection Table"
                        bordered={false}
                        style={{ marginTop: 24, borderRadius: 12 }}
                        extra={
                            <Input
                                prefix={<SearchOutlined />}
                                placeholder="Search by Subject"
                                style={{ width: 300 }}
                            />
                        }
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{
                                current: currentPage,
                                pageSize: 10,
                                total: data.length,
                                onChange: (page) => setCurrentPage(page),
                                showTotal: () => `Page ${currentPage} of ${Math.ceil(data.length / 10)}`,
                                showSizeChanger: false,
                            }}
                            bordered
                        />
                    </Card>

                    <Modal
                        title="Edit Student Fee"
                        open={isModalOpen} 
                        onCancel={() => setIsModalOpen(false)}
                        onOk={handleSave}
                        okText="Save"
                        cancelText="Cancel"
                    >
                        <Form layout="vertical" form={form}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="name" label="Name">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="class" label="Class">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="tuition" label="Tuition">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="hostel" label="Hostel">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="transport" label="Transport">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="dayboarding" label="Day-Boarding">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="total" label="Total">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="pending" label="Pending">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="status" label="Status">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default FinancePage;

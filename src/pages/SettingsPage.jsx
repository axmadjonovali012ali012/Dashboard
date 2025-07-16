import React from 'react';
import {
    Layout,
    Card,
    Form,
    Input,
    Button,
    Switch,
    Row,
    Col,
    Select,
    DatePicker,
    Upload,
    message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const { Content } = Layout;
const { Option } = Select;

const SettingsPage = () => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                console.log('Saved settings:', values);
                message.success('Settings saved successfully!');
            })
            .catch((err) => {
                console.log('Validation Failed:', err);
            });
    };

    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px', padding: '24px', background: '#f5f6fa', height: 'auto' }}>
                    <h2 style={{ marginBottom: 24 }}>User Settings</h2>
                    <Card bordered={false} style={{ borderRadius: 12 }}>
                        <Form layout="vertical" form={form}>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Full Name"
                                        name="fullname"
                                        rules={[{ required: true, message: 'Please enter your name' }]}
                                    >
                                        <Input placeholder="John Doe" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
                                    >
                                        <Input placeholder="admin@example.com" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Username" name="username">
                                        <Input placeholder="john_doe" />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Phone Number" name="phone">
                                        <Input placeholder="+998 90 123 45 67" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="New Password" name="password">
                                        <Input.Password placeholder="New password" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Date of Birth" name="dob">
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Gender" name="gender">
                                        <Select placeholder="Select gender">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Language" name="language">
                                        <Select placeholder="Select language">
                                            <Option value="uz">Uzbek</Option>
                                            <Option value="ru">Russian</Option>
                                            <Option value="en">English</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Upload Profile Photo" name="photo">
                                        <Upload maxCount={1}>
                                            <Button icon={<UploadOutlined />}>Upload Photo</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item style={{ textAlign: 'right' }}>
                                <Button type="primary" onClick={handleSave}>
                                    Save Settings
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SettingsPage;

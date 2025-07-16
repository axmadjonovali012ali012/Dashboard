import React from 'react';
import { Layout, Card, Calendar, Row, Col } from 'antd';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const { Content } = Layout;

const CalendarPage = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
            <Header />
            <Content
                style={{
                    margin: '24px',
                    padding: '24px',
                    background: '#f5f6fa',
                }}
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12}>
                        <Card title="Calendar 1" bordered={false} style={{ borderRadius: 12 }}>
                            <Calendar fullscreen={false} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <Card title="Calendar 2" bordered={false} style={{ borderRadius: 12 }}>
                            <Calendar fullscreen={false} />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>
);

export default CalendarPage;

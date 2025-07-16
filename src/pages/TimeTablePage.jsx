import React from 'react';
import { Layout, Card, Table } from 'antd';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const { Content } = Layout;

const columns = [
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Monday', dataIndex: 'monday', key: 'monday' },
    { title: 'Tuesday', dataIndex: 'tuesday', key: 'tuesday' },
    { title: 'Wednesday', dataIndex: 'wednesday', key: 'wednesday' },
    { title: 'Thursday', dataIndex: 'thursday', key: 'thursday' },
    { title: 'Friday', dataIndex: 'friday', key: 'friday' },
];

const data = [
    {
        key: 1,
        time: '9:00 - 10:00',
        monday: 'Math',
        tuesday: 'Science',
        wednesday: 'English',
        thursday: 'History',
        friday: 'Art',
    },
    {
        key: 2,
        time: '10:00 - 11:00',
        monday: 'English',
        tuesday: 'Math',
        wednesday: 'Science',
        thursday: 'Art',
        friday: 'History',
    },
    {
        key: 3,
        time: '11:00 - 12:00',
        monday: 'History',
        tuesday: 'English',
        wednesday: 'Math',
        thursday: 'Science',
        friday: 'Art',
    },
    {
        key: 4,
        time: '12:00 - 1:00',
        monday: 'Art',
        tuesday: 'History',
        wednesday: 'English',
        thursday: 'Math',
        friday: 'Science',
    },
    {
        key: 5,
        time: '1:00 - 2:00',
        monday: 'Science',
        tuesday: 'Art',
        wednesday: 'History',
        thursday: 'English',
        friday: 'Math',
    },
    {
        key: 6,
        time: '2:00 - 3:00',
        monday: 'Math',
        tuesday: 'Science',
        wednesday: 'Art',
        thursday: 'History',
        friday: 'English',
    },
    {
        key: 7,
        time: '3:00 - 4:00',
        monday: 'English',
        tuesday: 'Math',
        wednesday: 'Science',
        thursday: 'Art',
        friday: 'History',
    }
];

const TimeTablePage = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
            <Header />
            <Content style={{ margin: '24px', padding: '24px', background: '#f9f9fb' }}>
                <Card title="Time Table" bordered={false} style={{ borderRadius: 12 }}>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </Card>
            </Content>
        </Layout>
    </Layout>
);

export default TimeTablePage;

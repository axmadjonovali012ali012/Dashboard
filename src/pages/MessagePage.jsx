import React from 'react';
import { Layout, Card, List, Avatar, Typography } from 'antd';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const { Content } = Layout;
const { Title, Text } = Typography;

const messages = [
    { name: 'Jane Cooper', message: "Don’t forget the lab report. It’s due by tomorrow evening. Please submit it on the portal before 5 PM." },
    { name: 'Kristin Watson', message: 'We do have a math test on Friday. It will cover chapters 5 to 7, so be sure to revise those topics thoroughly.' },
    { name: 'Jenny Wilson', message: 'What? I didn’t hear about the homework. Could you please share the details in the group chat again?' },
    { name: 'Jacob Jones', message: 'Bring your book tomorrow. The teacher said we’ll start with Chapter 10 and have a reading session.' },
    { name: 'Cody Fisher', message: 'I will be late today due to some family emergency. Please inform the teacher that I’ll join the second period.' },
    { name: 'Esther Howard', message: 'Can you send me the notes from yesterday’s lecture? I missed it because I had a doctor’s appointment.' },
    { name: 'Annette Black', message: 'Can you review my essay on climate change? I want to make sure it’s ready before submission tomorrow.' },
    { name: 'Savannah Nguyen', message: 'I have a question about the assignment for social studies. Are we supposed to include references for the case study?' }
];


const MessagePage = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
            <Header />
            <Content style={{ margin: '20px', padding: '20px', background: '#f9f9fb' }}>
                <Card title="Messages" bordered={false} style={{ borderRadius: 12 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={messages}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<span>{item.name[0]}</span>} />}
                                    title={<Text strong>{item.name}</Text>}
                                    description={<Text type="secondary">{item.message}</Text>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Content>
        </Layout>
    </Layout>
);

export default MessagePage;

// src/pages/GroupDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { Layout, Card, Tag, List, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../components/firebase/config';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const { Content } = Layout;

const GroupDetailsPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    const fetchGroup = async () => {
        try {
            const groupRef = doc(db, 'groups', id);
            const groupSnap = await getDoc(groupRef);
            if (groupSnap.exists()) {
                const groupData = groupSnap.data();
                setGroup(groupData);

                const studentDocs = await Promise.all(
                    groupData.selectedStudents.map(studentId =>
                        getDoc(doc(db, 'students', studentId))
                    )
                );

                const studentList = studentDocs.map(docSnap => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setStudents(studentList);
            } else {
                message.error("Guruh topilmadi!");
            }
        } catch (error) {
            message.error("Xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroup();
    }, [id]);

    if (loading) return <Spin style={{ margin: '50px auto', display: 'block' }} />;

    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <Card title={`Guruh: ${group.name}`} bordered={false}>
                        <p><strong>O'qituvchi:</strong> {group.teacher}</p>
                        <p><strong>Yo'nalish:</strong> {group.direction}</p>
                        <p><strong>O'quvchilar soni:</strong> <Tag color="blue">{students.length}</Tag></p>
                        <List
                            header={<b>O'quvchilar ro'yxati</b>}
                            bordered
                            dataSource={students}
                            renderItem={item => (
                                <List.Item>
                                    {item.name} {item.lastname} ({item.className?.join(', ')})
                                </List.Item>
                            )}
                        />
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};

export default GroupDetailsPage;

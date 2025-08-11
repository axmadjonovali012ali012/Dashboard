// src/pages/GroupPage.jsx
import React, { useEffect, useState } from 'react';
import { Layout, Table, Input, Button, Popconfirm, Modal, message, Select, Space, Tag } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { db } from '../components/firebase/config';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        teacher: '',
        direction: '',
        selectedStudents: []
    });
    const [editingId, setEditingId] = useState(null);

    const teacherOptions = [
        { value: 'Ilhom', label: 'Ilhom' },
        { value: 'Asomiddin', label: 'Asomiddin' }
    ];

    const directionOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' }
    ];

    const fetchGroups = async () => {
        const querySnapshot = await getDocs(collection(db, 'groups'));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            studentCount: doc.data().selectedStudents?.length || 0
        }));
        setGroups(data);
    };

    const fetchStudents = async () => {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            fullName: `${doc.data().name} ${doc.data().lastname}`
        }));
        setStudents(data);
    };

    useEffect(() => {
        fetchGroups();
        fetchStudents();
    }, []);

    const handleAdd = () => {
        setEditingId(null);
        setFormData({ name: '', teacher: '', direction: '', selectedStudents: [] });
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        setFormData({
            name: record.name,
            teacher: record.teacher,
            direction: record.direction,
            selectedStudents: record.selectedStudents || []
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'groups', id));
            message.success("Guruh o'chirildi!");
            fetchGroups();
        } catch (error) {
            message.error("O'chirishda xatolik!");
        }
    };

    const handleSave = async () => {
        const { name, teacher, direction, selectedStudents } = formData;

        if (!name || !teacher || !direction || selectedStudents.length === 0) {
            message.error("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        try {
            const groupData = {
                name,
                teacher,
                direction,
                selectedStudents,
                studentCount: selectedStudents.length
            };

            if (editingId) {
                await updateDoc(doc(db, 'groups', editingId), groupData);
                message.success("Guruh yangilandi!");
            } else {
                await addDoc(collection(db, 'groups'), groupData);
                message.success("Yangi guruh qo'shildi!");
            }
            fetchGroups();
            setIsModalOpen(false);
        } catch (error) {
            message.error("Xatolik yuz berdi!");
        }
    };

    const columns = [
        {
            title: 'Guruh nomi',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Link to={`/groups/${record.id}`}>
                    {record.name}
                </Link>
            )
        },
        {
            title: "O'qituvchi",
            dataIndex: 'teacher',
            key: 'teacher'
        },
        {
            title: "Yo'nalish",
            dataIndex: 'direction',
            key: 'direction'
        },
        {
            title: "O'quvchilar soni",
            dataIndex: 'studentCount',
            key: 'studentCount',
            render: (count) => <Tag color="blue">{count}</Tag>
        },
        {
            title: 'Amallar',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Ishonchingiz komilmi?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ha"
                        cancelText="Yo'q"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <div style={{ marginBottom: 16, backgroundColor: 'white', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 30px', marginTop: '10px' }}>
                            <Input
                                placeholder="Qidirish"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                prefix={<SearchOutlined />}
                                style={{ width: 300 }}
                            />
                            <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
                                Guruh qo'shish
                            </Button>
                        </div>
                        <Table
                            style={{ padding: '0px 30px' }}
                            dataSource={groups.filter(group =>
                                group.name.toLowerCase().includes(searchText.toLowerCase()))
                            }
                            columns={columns}
                            rowKey="id"
                        />
                    </div>

                    <Modal
                        title={editingId ? "Guruhni tahrirlash" : "Yangi guruh qo'shish"}
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        onOk={handleSave}
                        okText={editingId ? "Yangilash" : "Saqlash"}
                        cancelText="Bekor qilish"
                        width={700}
                    >
                        <Input
                            placeholder="Guruh nomi"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{ marginBottom: 10 }}
                        />
                        <Select
                            placeholder="O'qituvchi"
                            style={{ width: '100%', marginBottom: 10 }}
                            value={formData.teacher}
                            onChange={(value) => setFormData({ ...formData, teacher: value })}
                            options={teacherOptions}
                        />
                        <Select
                            placeholder="Yo'nalish"
                            style={{ width: '100%', marginBottom: 10 }}
                            value={formData.direction}
                            onChange={(value) => setFormData({ ...formData, direction: value })}
                            options={directionOptions}
                        />
                        <div style={{ marginBottom: 10 }}>
                            <label style={{ display: 'block', marginBottom: 5 }}>O'quvchilar</label>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="O'quvchilarni tanlang"
                                value={formData.selectedStudents}
                                onChange={(value) => setFormData({ ...formData, selectedStudents: value })}
                                optionLabelProp="label"
                            >
                                {students.map(student => (
                                    <Select.Option
                                        key={student.id}
                                        value={student.id}
                                        label={student.fullName}
                                    >
                                        {student.fullName} ({student.className?.join(', ')})
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <span>Tanlangan o'quvchilar soni: </span>
                            <Tag color="green">{formData.selectedStudents.length}</Tag>
                        </div>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default GroupPage;

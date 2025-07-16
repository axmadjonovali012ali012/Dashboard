import React, { useEffect, useState } from 'react';
import {
    Layout, Table, Input, Avatar, Button, Dropdown, Menu, Space, Modal, Popconfirm, message, Card
} from 'antd';
import {
    SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownOutlined,
} from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TeacherAvatar from '../assets/Img2.png';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../components/firebase/config';

const { Content } = Layout;
const { Search } = Input;

const TeachersPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        location: '',
        phone: '',
        lavozim: '',
        parents: '',
    });
    const [editingTeacher, setEditingTeacher] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'Teachers'));
        const list = querySnapshot.docs.map((doc, index) => ({
            id: doc.id,
            no: String(index + 1).padStart(2, '0'),
            ...doc.data(),
            date: doc.data().createdAt?.toDate().toLocaleDateString() || '—',
        }));
        setTeachers(list);
        setLoading(false);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        const { name, lastname, location, phone, lavozim, parents } = formData;
        if (!name || !lastname || !location || !phone || !lavozim || !parents) {
            return message.error('Iltimos, barcha maydonlarni to‘ldiring!');
        }

        try {
            if (editingTeacher) {
                const ref = doc(db, 'Teachers', editingTeacher.id);
                await updateDoc(ref, formData);
                message.success('Muvaffaqiyatli yangilandi!');
            } else {
                await addDoc(collection(db, 'Teachers'), {
                    ...formData,
                    createdAt: Timestamp.now(),
                });
                message.success('O‘qituvchi qo‘shildi!');
            }
            fetchTeachers();
            handleModalClose();
        } catch (error) {
            console.error(error);
            message.error('Xatolik yuz berdi!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'Teachers', id));
            message.success('O‘chirish muvaffaqiyatli');
            fetchTeachers();
        } catch (error) {
            message.error('O‘chirishda xatolik!');
        }
    };

    const handleEdit = (record) => {
        setFormData(record);
        setEditingTeacher(record);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            lastname: '',
            location: '',
            phone: '',
            lavozim: '',
            parents: '',
        });
        setEditingTeacher(null);
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <Space>
                    <Avatar src={TeacherAvatar} />
                    {text}
                </Space>
            ),
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Position',
            dataIndex: 'lavozim',
            key: 'lavozim',
        },
        {
            title: 'Parents',
            dataIndex: 'parents',
            key: 'parents',
        },
        {
            title: 'Date Added',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <EyeOutlined style={{ cursor: 'pointer' }} />
                    <EditOutlined onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }} />
                    <Popconfirm
                        title="O‘chirishni tasdiqlaysizmi?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ha"
                        cancelText="Yo‘q"
                    >
                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const classMenu = (
        <Menu>
            <Menu.Item key="all">All Departments</Menu.Item>
            <Menu.Item key="math">Math</Menu.Item>
            <Menu.Item key="physics">Physics</Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px', padding: '24px', height: '100vh', overflowY: 'auto' }}>
                    <h1>Teachers</h1>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                            <Search placeholder="Search by Name" style={{ width: 300 }} prefix={<SearchOutlined />} />
                            <div style={{ display: 'flex', gap: 12 }}>
                                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                                    Add New Teacher
                                </Button>
                                <Dropdown overlay={classMenu}>
                                    <Button>
                                        All Departments <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>

                        <Table
                            columns={columns}
                            dataSource={teachers}
                            loading={loading}
                            pagination={{
                                current: currentPage,
                                pageSize: 10,
                                total: teachers.length,
                                onChange: (page) => setCurrentPage(page),
                                showTotal: (total) => `Page ${currentPage} of ${Math.ceil(total / 10)}`,
                                showSizeChanger: false,
                            }}
                            bordered
                        />
                    </div>
                </Content>
            </Layout>

            <Modal
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
                title={editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                destroyOnClose
                style={{ top: 50 }}
                bodyStyle={{ padding: '24px', borderRadius: 12 }}
            >
                <Card bodyStyle={{ background: 'white', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Input placeholder="Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
                        <Input placeholder="Lastname" value={formData.lastname} onChange={e => handleChange('lastname', e.target.value)} />
                        <Input placeholder="Location" value={formData.location} onChange={e => handleChange('location', e.target.value)} />
                        <Input placeholder="Phone" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                        <Input placeholder="Position" value={formData.lavozim} onChange={e => handleChange('lavozim', e.target.value)} />
                        <Input placeholder="Parents" value={formData.parents} onChange={e => handleChange('parents', e.target.value)} />
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Card>
            </Modal>
        </Layout>
    );
};

export default TeachersPage;

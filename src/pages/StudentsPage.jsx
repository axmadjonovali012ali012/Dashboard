import React, { useEffect, useState } from 'react';
import { Layout, Table, Input, Button, Popconfirm, Modal, message, Select, Space } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { db } from '../components/firebase/config';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const { Content } = Layout;

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        address: '',
        className: []
    });
    const [editingId, setEditingId] = useState(null);

    const fetchStudents = async () => {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAdd = () => {
        setEditingId(null);
        setFormData({ name: '', lastname: '', phone: '', address: '', className: [] });
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        setFormData(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'students', id));
            message.success("O'quvchi o'chirildi!");
            fetchStudents();
        } catch (error) {
            message.error("O'chirishda xatolik!");
        }
    };

    const handleSave = async () => {
        const { name, lastname, phone, address, className } = formData;

        if (!name || !lastname || !phone || !address || className.length === 0) {
            message.error("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        try {
            if (editingId) {
                await updateDoc(doc(db, 'students', editingId), formData);
                message.success("O'quvchi yangilandi!");
            } else {
                await addDoc(collection(db, 'students'), formData);
                message.success("Yangi o'quvchi qo'shildi!");
            }
            fetchStudents();
            setIsModalOpen(false);
        } catch (error) {
            message.error("Xatolik yuz berdi!");
        }
    };

    const columns = [
        {
            title: "Ismi",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: "Familiyasi",
            dataIndex: 'lastname',
            key: 'lastname'
        },
        {
            title: "Telefon",
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: "Manzil",
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: "Sinf",
            dataIndex: 'className',
            key: 'className',
            render: (text) => text?.join(', ')
        },
        {
            title: 'Harakatlar',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="O'chirishga ishonchingiz komilmi?"
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
                                O'quvchi qo'shish
                            </Button>
                        </div>
                        <Table
                            style={{ padding: '0px 30px' }}
                            dataSource={students.filter(student =>
                                student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                student.lastname.toLowerCase().includes(searchText.toLowerCase()))
                            }
                            columns={columns}
                            rowKey="id"
                        />
                    </div>

                    <Modal
                        title={editingId ? "O'quvchini tahrirlash" : "Yangi o'quvchi qo'shish"}
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        onOk={handleSave}
                        okText={editingId ? "Yangilash" : "Saqlash"}
                        cancelText="Bekor qilish"
                    >
                        <Input
                            placeholder="Ismi"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{ marginBottom: 10 }}
                        />
                        <Input
                            placeholder="Familiyasi"
                            value={formData.lastname}
                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            style={{ marginBottom: 10 }}
                        />
                        <Input
                            placeholder="Telefon raqam"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ marginBottom: 10 }}
                        />
                        <Input
                            placeholder="Manzil"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            style={{ marginBottom: 10 }}
                        />
                        <div style={{ marginBottom: 10 }}>
                            <label style={{ display: 'block', marginBottom: 5 }}>Sinf</label>
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Sinfni tanlang yoki yozing"
                                value={formData.className}
                                onChange={(value) => setFormData({ ...formData, className: value })}
                                tokenSeparators={[',']}
                            >
                                <Select.Option value="12-A">12-A</Select.Option>
                                <Select.Option value="12-B">12-B</Select.Option>
                            </Select>
                        </div>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default StudentsPage;
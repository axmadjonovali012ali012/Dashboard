import React, { useState, useEffect } from 'react';
import {
    Layout, Table, Input, Avatar, Button, Dropdown, Menu, Space, Modal, Spin, Popconfirm, message
} from 'antd';
import {
    SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownOutlined,
} from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TeacherAvatar from '../assets/Img2.png';
import AddStudentForm from './AddStudentsForm';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../components/firebase/config';

const { Content } = Layout;
const { Search } = Input;

const StudentsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'Students'));
            const studentsList = querySnapshot.docs.map((doc, index) => {
                const data = doc.data();
                return {
                    key: doc.id,
                    id: doc.id,
                    no: String(index + 1).padStart(2, '0'),
                    ...data,
                    createdAt: data.createdAt?.toDate?.().toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }) || 'N/A',
                };
            });
            setStudents(studentsList);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAddStudent = () => {
        setIsEditMode(false);
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleEditStudent = (student) => {
        setIsEditMode(true);
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleDeleteStudent = async (id) => {
        try {
            await deleteDoc(doc(db, 'Students', id));
            message.success('Deleted successfully');
            fetchStudents();
        } catch (error) {
            console.error('Delete error:', error);
            message.error('Failed to delete');
        }
    };

    const handleSaveStudent = async (formValues) => {
        try {
            if (
                !formValues.name ||
                !formValues.lastname ||
                !formValues.location ||
                !formValues.phone ||
                !formValues.parents
            ) {
                return message.warning('Iltimos, barcha maydonlarni to‘ldiring!');
            }

            if (isEditMode && editingStudent) {
                const studentRef = doc(db, 'Students', editingStudent.id);
                await updateDoc(studentRef, formValues);
                message.success('Updated successfully');
            } else {
                await addDoc(collection(db, 'Students'), {
                    ...formValues,
                    createdAt: new Date(),
                });
                message.success('Added successfully');
            }
            setIsModalOpen(false);
            fetchStudents();
        } catch (error) {
            console.error('Save error:', error);
            message.error('Failed to save');
        }
    };

    const classMenu = (
        <Menu>
            <Menu.Item key="all">All Classes</Menu.Item>
            <Menu.Item key="12A">12-A</Menu.Item>
            <Menu.Item key="12B">12-B</Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 50,
        },
        {
            title: 'Student',
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
            title: 'Contact',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Parents',
            dataIndex: 'parents',
            key: 'parents',
        },
        {
            title: 'Date Added',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <EyeOutlined style={{ cursor: 'pointer' }} />
                    <EditOutlined style={{ cursor: 'pointer' }} onClick={() => handleEditStudent(record)} />
                    <Popconfirm
                        title="Are you sure delete this student?"
                        onConfirm={() => handleDeleteStudent(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Layout style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px', padding: '24px', height: '100vh', overflowY: 'auto' }}>
                    <h1>Students</h1>

                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ margin: 0 }}>All Students List</h3>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <Search placeholder="Search by Name or Roll" style={{ width: 300 }} prefix={<SearchOutlined />} />
                            <div style={{ display: 'flex', gap: 12 }}>
                                <Button type="primary" onClick={handleAddStudent}>Add New Student</Button>
                                <Dropdown overlay={classMenu}>
                                    <Button>
                                        All Classes <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>

                        {loading ? (
                            <Spin size="large" style={{ display: 'block', marginTop: 50 }} />
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={students}
                                pagination={{
                                    current: currentPage,
                                    pageSize: 10,
                                    total: students.length,
                                    onChange: (page) => setCurrentPage(page),
                                    showTotal: (total, range) =>
                                        `Page ${currentPage} of ${Math.ceil(total / 10)}`,
                                    showSizeChanger: false,
                                }}
                                bordered
                            />
                        )}
                    </div>

                    <Modal
                        open={isModalOpen}
                        onCancel={() => {
                            setIsModalOpen(false);
                            setEditingStudent(null);
                        }}
                        footer={null}
                        title={isEditMode ? 'Edit Student' : 'Add New Student'}
                        width={500}
                        style={{ top: 40 }}
                        destroyOnClose
                        bodyStyle={{ background: '#f5f5f5', borderRadius: 12, padding: 0 }}
                    >
                        <div
                            style={{
                                padding: '24px',
                                backgroundColor: 'white',
                                borderRadius: 12,
                            }}
                        >
                            <AddStudentForm
                                onSave={handleSaveStudent}
                                initialData={editingStudent}
                            />
                        </div>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default StudentsPage;

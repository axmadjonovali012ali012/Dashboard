import React, { useState } from 'react';
import { Table, Input, Button, Tag, Space, Tooltip } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';

const initialData = [
    {
        key: '1',
        no: '01',
        task: 'Read Chapters1-3',
        subject: 'English',
        dueDate: '12 May 2024',
        status: 'In Progress',
    },
    {
        key: '2',
        no: '02',
        task: 'Complete Problem Set #5',
        subject: 'Maths',
        dueDate: '12 May 2024',
        status: 'Not Started',
    },
    {
        key: '3',
        no: '03',
        task: 'Write Lab Report on Acid-Base Titration',
        subject: 'Physics',
        dueDate: '12 May 2024',
        status: 'In Progress',
    },
    {
        key: '4',
        no: '04',
        task: 'Prepare for Oral Presentation',
        subject: 'Chemistry',
        dueDate: '12 May 2024',
        status: 'In Progress',
    },
    {
        key: '5',
        no: '05',
        task: 'Create Art Piece for Final Project',
        subject: 'English',
        dueDate: '12 May 2024',
        status: 'Completed',
    },
    {
        key: '6',
        no: '06',
        task: 'Write Research Paper on Climate Change',
        subject: 'EVS',
        dueDate: '12 May 2024',
        status: 'In Progress',
    },
    {
        key: '7',
        no: '07',
        task: 'Complete Math Quiz on Algebra',
        subject: 'Math',
        dueDate: '12 May 2024',
        status: 'Completed',
    },
    {
        key: '8',
        no: '08',
        task: 'Prepare for History Class Debate',
        subject: 'History',
        dueDate: '12 May 2024',
        status: 'Not Started',
    },
    {
        key: '9',
        no: '09',
        task: 'Submit Final Design for Architecture Project',
        subject: 'Architecture',
        dueDate: '12 May 2024',
        status: 'In Progress',
    },
    // Add more data if you want more pages
];

const statusColors = {
    'In Progress': 'blue',
    'Not Started': 'red',
    Completed: 'green',
};

const AssignmentsTable = () => {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleDelete = (key) => {
        setData(data.filter((item) => item.key !== key));
    };

    const handleEdit = (record) => {
        alert(`Edit: ${record.task}`);
        // You can open modal here for editing
    };

    const filteredData = data.filter((item) =>
        item.subject.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns = [
        { title: 'No', dataIndex: 'no', key: 'no' },
        { title: 'Task', dataIndex: 'task', key: 'task' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
        { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={statusColors[status]} style={{ borderRadius: '8px', padding: '4px 8px' }}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <EditOutlined onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <DeleteOutlined onClick={() => handleDelete(record.key)} style={{ color: 'red', cursor: 'pointer' }} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ background: '#fff', padding: 24, borderRadius: 16, marginTop: 24, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>Assignments</h3>
                <Input
                    placeholder="Search by Subject"
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={handleSearch}
                    style={{ width: 250 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                rowKey="key"
            />

            {/* Pagination Controls */}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</Button>
                <span style={{ opacity: 0.5 }}>Page {currentPage} of {Math.ceil(filteredData.length / pageSize)}</span>
                <Button
                    disabled={currentPage >= Math.ceil(filteredData.length / pageSize)}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AssignmentsTable;

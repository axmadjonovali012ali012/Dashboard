import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TeachersTable = () => {
    const [data, setData] = useState([
        {
            key: '1',
            name: 'Sophia Wilson',
            roll: '522bcs009',
            class: '12 - A',
            accom: 'Hosteller',
            transport: 'No',
            location: 'Singanallur',
            contact: '82486 69098',
            rank: '001',
            points: '28980',
        },
        // Qo‘shimcha ma’lumotlar ham qo‘shing...
    ]);

    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
        message.success('Deleted');
    };

    const handleEdit = (record) => {
        message.info(`Edit: ${record.name}`);
        // Modal yoki form ochishingiz mumkin
    };

    const columns = [
        { title: 'No', dataIndex: 'key', key: 'key', width: 60 },
        { title: 'Students', dataIndex: 'name', key: 'name' },
        { title: 'Roll num', dataIndex: 'roll', key: 'roll' },
        { title: 'Class', dataIndex: 'class', key: 'class' },
        { title: 'Accom._Type', dataIndex: 'accom', key: 'accom' },
        { title: 'Transport', dataIndex: 'transport', key: 'transport' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Contact', dataIndex: 'contact', key: 'contact' },
        { title: 'Rank', dataIndex: 'rank', key: 'rank' },
        { title: 'Points', dataIndex: 'points', key: 'points' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        type="text"
                    />
                    <Popconfirm
                        title="Are you sure delete this teacher?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            type="text"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{
                current: currentPage,
                pageSize: 10,
                total: 120,
                onChange: (page) => setCurrentPage(page),
                showTotal: (total) => `Page ${currentPage} of ${Math.ceil(total / 10)}`,
                showSizeChanger: false,
            }}
            bordered
        />
    );
};

export default TeachersTable;

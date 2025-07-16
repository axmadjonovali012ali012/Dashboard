import React, { useState, useEffect } from 'react';
import { Card, Input, Row, Col, Button, Radio } from 'antd';

const AddStudentForm = ({ onSave, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        location: '',
        phone: '',
        parents: '',
        accom: 'Hosteller',
        transport: 'No',
        ...initialData,
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const requiredFields = ['name', 'lastname', 'location', 'phone', 'parents'];
        const hasEmpty = requiredFields.some(field => !formData[field]?.trim());

        if (hasEmpty) {
            alert('Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        onSave(formData);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
                placeholder="Name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
            />
            <Input
                placeholder="Lastname"
                value={formData.lastname}
                onChange={e => handleChange('lastname', e.target.value)}
            />
            <Input
                placeholder="Location"
                value={formData.location}
                onChange={e => handleChange('location', e.target.value)}
            />
            <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
            />
            <Input
                placeholder="Parents"
                value={formData.parents}
                onChange={e => handleChange('parents', e.target.value)}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handleSave}>
                    {initialData ? 'Update' : 'Save'}
                </Button>
            </div>
        </div>
    );
};


export default AddStudentForm;

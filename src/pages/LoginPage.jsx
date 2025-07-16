import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { auth } from '../components/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, message: 'Login yoki Parol xato' };
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        const { email, password } = values;

        try {
            const res = await loginWithEmail(email, password);
            if (res.success) {
                const token = res.user.accessToken;

                localStorage.setItem('_token', token);
                localStorage.setItem('justLoggedIn', 'true');

                toast.success("Saytga xush kelibsiz!", { autoClose: 1000 });

                setTimeout(() => {
                    navigate('/');
                }, 1200);
            } else {
                toast.error(res.message); 
            }
        } catch (error) {
            toast.error('Nomaʼlum xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            {contextHolder}
            <ToastContainer /> 

            <div className="login_page">
                <div className="header_block">
                    <div className="label">
                        <div className="logo">
                            <img width={130} height={50} src="/1logo.svg" alt="logo" />
                        </div>
                    </div>

                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Emailni kiriting!' },
                            ]}
                        >
                            <Input type='email' style={{ height: '40px' }} placeholder="Email kiriting" />
                        </Form.Item>

                        <Form.Item
                            label="Parol"
                            name="password"
                            rules={[
                                { required: true, message: 'Parolni kiriting!' },
                                { min: 4, message: 'Parol kamida 4 ta belgidan iborat bo‘lishi kerak' }
                            ]}
                        >
                            <Input.Password style={{ height: '40px' }} placeholder="Parol kiriting" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn_submit"
                                loading={loading}
                                block
                            >
                                Kirish
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../components/firebase/config';
import { signOut } from 'firebase/auth';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('_token');

      if (!token) {
        setValid(false);
        setChecking(false);
        return;
      }

      try {
        // Firebase orqali tokenni verifikatsiya qilish
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCqMoODwaHrOSi_5yUerOqrISwjHQWv3CE`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: token }),
          }
        );

        const data = await response.json();

        if (data.users) {
          setValid(true);
        } else {
          throw new Error('Token invalid');
        }
      } catch (err) {
        console.error('Token invalid or expired:', err.message);
        localStorage.removeItem('_token');
        await signOut(auth); // Firebase authni ham tozalaymiz
        setValid(false);
      } finally {
        setChecking(false);
      }
    };

    checkToken();
  }, []);

  if (checking) {
    return <div className='loading'>
      <Spin  indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>; 
  }

  if (!valid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

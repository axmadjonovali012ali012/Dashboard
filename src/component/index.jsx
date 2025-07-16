import React from 'react'
import { Route, Navigate, Routes } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import DashboardPage from '../pages/DashboardPage'; // ❗ Qo‘shilgan
import StudentPage from '../pages/StudentsPage'
import TeachersPage from '../pages/TeachersPage'
import CalendarPage from '../pages/CalendarPage'
import MessagePage from '../pages/MessagePage'
import TimeTablePage from '../pages/TimeTablePage'
import FinancePage from '../pages/FinancePage'
import SettingsPage from '../pages/SettingsPage'

const Index = () => {
    return (
        <Routes>
            {/* 🔵 Dashboard yo‘li qo‘shildi */}
            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

            <Route path="/students" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
            <Route path="/teachers" element={<ProtectedRoute><TeachersPage /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/message" element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
            <Route path="/timetable" element={<ProtectedRoute><TimeTablePage /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute><FinancePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

            {/* Not Found → Dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default Index;

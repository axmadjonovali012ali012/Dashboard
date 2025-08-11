import React from 'react'
import { Route, Navigate, Routes } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import StudentPage from '../pages/StudentsPage'
import TeachersPage from '../pages/TeachersPage'
import CalendarPage from '../pages/CalendarPage'
import MessagePage from '../pages/MessagePage'
import TimeTablePage from '../pages/TimeTablePage'
import FinancePage from '../pages/FinancePage'
import SettingsPage from '../pages/SettingsPage'
import GroupPage from '../pages/GroupPage';
import GroupDetailsPage from '../pages/GroupDetailsPage'

const Index = () => {
    return (
        <Routes>

            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
            <Route path="/teachers" element={<ProtectedRoute><TeachersPage /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/message" element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
            <Route path="/timetable" element={<ProtectedRoute><TimeTablePage /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute><FinancePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/groups" element={<GroupPage />} />
            <Route path="/groups/:id" element={<GroupDetailsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default Index;

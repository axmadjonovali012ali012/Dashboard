import React, { useState } from "react";
import { Calendar, Modal, Input, Button, Badge, Popconfirm, Layout } from "antd";
import dayjs from "dayjs";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const { Content } = Layout;

const CalendarPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState({});
    const [calendarMode, setCalendarMode] = useState("month");

    const onSelectDate = (date, info) => {
        if (info.source === "date" && calendarMode === "month") {
            setSelectedDate(date);
            setNote("");
            setIsModalVisible(true);
        }
    };

    const onPanelChange = (value, mode) => {
        setCalendarMode(mode);
    };

    const handleOk = () => {
        if (!note.trim()) return;
        const dateKey = selectedDate.format("YYYY-MM-DD");
        setNotes((prevNotes) => ({
            ...prevNotes,
            [dateKey]: [...(prevNotes[dateKey] || []), note],
        }));
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteNote = (dateKey, index) => {
        setNotes((prevNotes) => {
            const updatedNotes = { ...prevNotes };
            updatedNotes[dateKey].splice(index, 1);
            if (updatedNotes[dateKey].length === 0) delete updatedNotes[dateKey];
            return updatedNotes;
        });
    };

    const dateCellRender = (date) => {
        const dateKey = date.format("YYYY-MM-DD");
        const dayNotes = notes[dateKey] || [];
        return (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {dayNotes.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Badge status="success" text={item} />
                        <Popconfirm
                            title="Zametkani o'chirmoqchimisiz?"
                            onConfirm={(e) => {
                                e?.stopPropagation();
                                deleteNote(dateKey, index);
                            }}
                            okText="Ha"
                            cancelText="Yo‘q"
                        >
                            <Button
                                size="small"
                                danger
                                onClick={(e) => e.stopPropagation()}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: "16px", width: "calc(100% - 50px)" }}>
                    <Calendar
                        dateCellRender={dateCellRender}
                        onSelect={onSelectDate}
                        onPanelChange={onPanelChange}
                    />

                    <Modal
                        title={`Zametka qo'shish - ${selectedDate.format("YYYY-MM-DD")}`}
                        open={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="Qo'shish"
                        cancelText="Bekor qilish"
                    >
                        <Input.TextArea
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Zametka yozing..."
                        />
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CalendarPage;

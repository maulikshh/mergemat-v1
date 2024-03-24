import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [showOverlay, setShowOverlay] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handlePrevMonth = () => {
        setMonth(month === 1 ? 12 : month - 1);
    };

    const handleNextMonth = () => {
        setMonth(month === 12 ? 1 : month + 1);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
        const calendarDays = [];

        // Add day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
            calendarDays.push(
                <div key={`day-name-${i}`} className="text-center font-semibold">
                    {dayNames[i]}
                </div>
            );
        }

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
        }

        // Add calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(
                <div key={`day-${day}`} className="text-center">
                    {day}
                </div>
            );
        }

        return calendarDays;
    };

    const handleAddEvent = () => {
        setShowOverlay(true);
    };

    const handleOverlaySubmit = () => {
        // Perform event submission logic here
        console.log('Event Date:', eventDate);
        console.log('Event Time:', eventTime);
        console.log('Event Description:', eventDescription);

        // Reset overlay state
        setShowOverlay(false);
        setEventDate('');
        setEventTime('');
        setEventDescription('');
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="flex-shrink-0 flex items-center justify-between p-6 border-b">
                    {/* Top bar content here */}
                </div>

                {/* Calendar and activity section */}
                <div className="flex-grow flex overflow-hidden">
                    {/* Calendar */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-lg font-semibold">Calendar</div>
                            <div className="flex items-center">
                                <button className="text-gray-600 mr-2" onClick={handlePrevMonth}>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <div className="text-center pl-20">
                                    <DatePicker
                                        selected={new Date(year, month - 1)}
                                        onChange={(date) => {
                                            setMonth(date.getMonth() + 1);
                                            setYear(date.getFullYear());
                                        }}
                                        dateFormat="MMMM yyyy"
                                        showMonthYearPicker
                                        className="font-semibold text-lg"
                                    />
                                </div>
                                <button className="text-gray-600 ml-2" onClick={handleNextMonth}>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddEvent}>
                                Add Event
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-4 text-center">
                            {/* Day names */}
                            {renderCalendarDays()}
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="w-full lg:w-60 bg-white p-6 shadow-lg overflow-y-auto">
                        {/* Notifications and activities */}
                        <NotificationBar />
                    </div>
                </div>
            </div>

            {/* Event overlay */}
            {showOverlay && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
                        <div className="mb-4">
                            <label htmlFor="event-date" className="block font-medium mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                id="event-date"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-time" className="block font-medium mb-1">
                                Time
                            </label>
                            <input
                                type="time"
                                id="event-time"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-description" className="block font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                id="event-description"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleOverlaySubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;

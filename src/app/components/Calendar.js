'use client';

import { useState, useEffect } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    subMonths,
    addMonths,
    isSameDay,
    isSameMonth,
    parseISO,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { useAuth } from '../../context/AuthContext';

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const { isLoggedIn } = useAuth();

    const [events] = useState([
        { id: 1, date: '2025-01-20', title: 'Workshop: Nachhaltiger Konsum', description: 'Lerne, wie du deinen Alltag nachhaltig gestalten kannst.', location: 'Online (Zoom)' },
        { id: 2, date: '2025-01-25', title: 'Vortrag: Minimalismus im Alltag', description: 'Ein inspirierender Vortrag über die Vorteile eines minimalistischen Lebensstils.', location: 'Reutlingen, Aula H10' },
        { id: 3, date: '2025-01-30', title: 'Workshop: DIY-Recycling', description: 'Kreative Ideen für Recycling und Upcycling.', location: 'Online (Google Meet)' },
        { id: 4, date: '2025-01-30', title: 'Seminar: Zero-Waste-Lifestyle', description: 'Ein detaillierter Leitfaden zum Leben ohne Abfall.', location: 'Stuttgart, Konferenzzentrum' },
        { id: 5, date: '2025-02-10', title: 'Diskussionsrunde: Nachhaltige Zukunft', description: 'Diskutiere über die Möglichkeiten einer nachhaltigen Gesellschaft.', location: 'Online, Zoom' },
        { id: 6, date: '2025-02-10', title: 'Webinar: Plastikfrei einkaufen', description: 'Praktische Tipps und Strategien für einen plastikfreien Alltag.', location: 'Online, Teams' },
    ]);

    // Load bookmarked events from localStorage
    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarkedEvents');
        if (storedBookmarks) {
            setBookmarkedEvents(JSON.parse(storedBookmarks));
        }
    }, []);

    // Save bookmarked events to localStorage
    const updateLocalStorage = (updatedBookmarks) => {
        localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
    };

    const addBookmark = (event) => {
        if (!bookmarkedEvents.find((e) => e.id === event.id)) {
            const updatedBookmarks = [...bookmarkedEvents, event];
            setBookmarkedEvents(updatedBookmarks);
            updateLocalStorage(updatedBookmarks);
        }
    };

    const removeBookmark = (eventId) => {
        const updatedBookmarks = bookmarkedEvents.filter((e) => e.id !== eventId);
        setBookmarkedEvents(updatedBookmarks);
        updateLocalStorage(updatedBookmarks);
    };

    const renderCalendar = () => {
        const startMonth = startOfMonth(currentMonth);
        const endMonth = endOfMonth(currentMonth);
        const startDate = startOfWeek(startMonth, { locale: de });
        const endDate = endOfWeek(endMonth, { locale: de });

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const currentDay = day;
                const dayEvents = events.filter((event) =>
                    isSameDay(currentDay, parseISO(event.date))
                );
                days.push(
                    <div
                        key={currentDay.toISOString()}
                        className={`border p-2 text-center cursor-pointer ${
                            isSameDay(currentDay, selectedDate) ? 'bg-[#A9D09A] text-white' : 'bg-white'
                        } ${!isSameMonth(currentDay, currentMonth) ? 'text-gray-400' : ''}`}
                        onClick={() => setSelectedDate(new Date(currentDay))}
                    >
                        <p className="font-bold">{format(currentDay, 'd')}</p>
                        {dayEvents.length > 0 && <p className="text-xs text-gray-600">{dayEvents.length} Event(s)</p>}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={`row-${day}`} className="grid grid-cols-7">
                    {days}
                </div>
            );
            days = [];
        }

        return rows;
    };

    const renderEvents = () => {
        const selectedDayEvents = events.filter((event) =>
            isSameDay(parseISO(event.date), selectedDate)
        );

        if (selectedDayEvents.length === 0) {
            return <p className="text-gray-600">Keine Events für diesen Tag.</p>;
        }

        return selectedDayEvents.map((event) => (
            <div
                key={event.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
                <h2 className="font-anonymous-pro text-lg text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-700">{event.description}</p>
                <p className="text-sm text-gray-500">📍 {event.location}</p>
                {isLoggedIn && (
                    <button
                        className="mt-2 bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                        onClick={() => addBookmark(event)}
                    >
                        Vormerken
                    </button>
                )}
            </div>
        ));
    };

    const renderBookmarks = () => {
        if (bookmarkedEvents.length === 0) {
            return <p className="text-gray-600">Keine vorgemerkten Events.</p>;
        }

        return bookmarkedEvents.map((event) => (
            <div
                key={event.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
                <h2 className="font-anonymous-pro text-lg text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-500">{format(parseISO(event.date), 'dd.MM.yyyy')}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
                <button
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeBookmark(event.id)}
                >
                    Entfernen
                </button>
            </div>
        ));
    };

    return (
        <div className="bg-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="ueberschrift text-center mt-8">Eventkalender</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Kalender */}
                    <div className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                            >
                                ◀ Zurück
                            </button>
                            <h2 className="font-anonymous-pro text-xl text-gray-800">
                                {format(currentMonth, 'MMMM yyyy', { locale: de })}
                            </h2>
                            <button
                                className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                            >
                                Weiter ▶
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            <div className="font-bold text-gray-600">Mo</div>
                            <div className="font-bold text-gray-600">Di</div>
                            <div className="font-bold text-gray-600">Mi</div>
                            <div className="font-bold text-gray-600">Do</div>
                            <div className="font-bold text-gray-600">Fr</div>
                            <div className="font-bold text-gray-600">Sa</div>
                            <div className="font-bold text-gray-600">So</div>
                        </div>
                        {renderCalendar()}
                        {!isLoggedIn && (
                            <div className="mt-4 text-center bg-gray-200 p-4 rounded-lg shadow-md">
                                <p className="text-gray-700">
                                    Melde dich an, um Veranstaltungen vorzumerken und Benachrichtigungen zu erhalten!
                                </p>
                                <button
                                    className="mt-2 bg-white text-black border-2 border-[#A9D09A] px-4 py-2 rounded hover:bg-[#A9D09A] hover:text-white"
                                    onClick={() => {
                                        window.location.href = '/Login';
                                    }}
                                >
                                    Jetzt einloggen
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Events */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                            Events am {format(selectedDate, 'dd.MM.yyyy')}
                        </h2>
                        {renderEvents()}
                    </div>
                </div>

                {/* Bookmarked Events */}
                {isLoggedIn && (
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="font-anonymous-pro text-xl text-gray-800 mb-4">Vorgemerkte Events</h3>
                        {renderBookmarks()}
                    </div>
                )}
            </div>
        </div>
    );
}

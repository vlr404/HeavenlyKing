// eventsData.ts

export type EventType = 'event' | 'holiday';

export type EventPoster = {
    image: string;
};

export type EventItem = {
    id: string;
    title: string;
    date: string;
    type: EventType;
    poster?: EventPoster;
};

export const eventsBase: EventItem[] = [
    {
        id: "1",
        title: "PILGRIMAGE",
        date: "2026-02-10T10:00:00",
        type: "event",
    },
    {
        id: "2",
        title: "EASTER",
        date: "2026-04-07T21:11:00",
        type: "holiday",
        poster: {
            // Убери ./public — Vite отдаёт папку public как корень сайта
            image: "/foto/изображение_2026-03-07_212824305-Photoroom.png",
        },
    },
];
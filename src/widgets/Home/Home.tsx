import './Home.css';
import { eventsBase } from '../../shared/CountdownTimer/holidays';
import { CountdownTimer } from '../../shared/CountdownTimer/CountdownTimer';
import { Space } from '../../shared/Space/Space';
import type { EventItem } from '../../shared/CountdownTimer/holidays';

// Возвращает ближайшее будущее событие ИЛИ событие которое идёт сегодня
const getNextEvent = (events: EventItem[]): EventItem | null => {
    if (!events || events.length === 0) return null;

    const now   = new Date();

    // Конец сегодняшнего дня — 23:59:59
    const endOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59
    );

    const activeEvents = events
        .filter(event => new Date(event.date) <= endOfToday)  // уже наступило или сегодня
        .filter(event => {
            // Оставляем только если это сегодня или в будущем (не вчера и раньше)
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === now.getFullYear() &&
                eventDate.getMonth()    === now.getMonth()    &&
                eventDate.getDate()     === now.getDate()
            ) || eventDate > now;
        });

    const futureEvents = events.filter(event => new Date(event.date) > now);

    // Приоритет: сначала сегодняшнее событие, потом ближайшее будущее
    const todayEvent = activeEvents[0] ?? null;
    const nextEvent  = futureEvents.sort(
        (a, b) => +new Date(a.date) - +new Date(b.date)
    )[0] ?? null;

    return todayEvent ?? nextEvent;
};

export const Home = () => {
    const activeEvent = getNextEvent(eventsBase);

    return (
<<<<<<< Updated upstream:src/widgets/Home/Home.tsx
        <section id="Home" className="home section-npt">
=======
        <section id="hero" className="hero section-npt">
>>>>>>> Stashed changes:src/widgets/Home/Hero/Hero.tsx
            <div className="section-container">
                <div className="home__preview">
                    <div className="home__preview-title">
                        <h1>ЦАРСТВИЕ НЕБЕСНОЕ</h1>
                    </div>
                    <div className="home__preview-subtitle">
                        <h3>Здесь начинается путь к духовному обновлению</h3>
                    </div>
                    <Space mt={30} />

                    <button className="buttonh">Посетить Церковь</button>
                    <Space mt={60} />
                    {activeEvent ? (
                        <CountdownTimer
                            targetDate={activeEvent.date}
                            title={activeEvent.title}
                            poster={activeEvent.poster}
                        />
                    ) : (
                        null
                    )}
                </div>
            </div>
        </section>
    );
};
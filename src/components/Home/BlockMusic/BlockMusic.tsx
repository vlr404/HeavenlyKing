import { useState, useEffect, useRef } from 'react';
import './BlockMusic.css';

type Track = {
    id: string;
    url: string;
    title: string;
    author: string;
    cover: string;
    duration: string;
};

const rawAudioUrls: string[] = [
    "/audio/Alena - Ярмарка судеб (1).mp3",
    "/audio/Alena - Ярмарка судеб (2).mp3",
    "/audio/Alena - Ярмарка судеб.mp3",
    "/audio/Daram Dam & YOKU - Я пришел к тебе с приветом.mp3",
    "/audio/Alena - Ярмарка судеб (1).mp3",
    "/audio/Alena - Ярмарка судеб (2).mp3",
    "/audio/Alena - Ярмарка судеб.mp3",
    "/audio/Daram Dam & YOKU - Я пришел к тебе с приветом.mp3",
];

export const BlockMusic = () => {
    const audioRef          = useRef<HTMLAudioElement>(null);
    const progressBarRef    = useRef<HTMLDivElement>(null);
    const volumeBarRef      = useRef<HTMLDivElement>(null);

    const [playlist, setPlaylist]               = useState<Track[]>([]);
    const [currentTrack, setCurrentTrack]       = useState<Track | null>(null);
    const [isPlaying, setIsPlaying]             = useState<boolean>(false);
    const [isShuffle, setIsShuffle]             = useState<boolean>(false);
    const [isRepeat, setIsRepeat]               = useState<boolean>(false);
    const [progress, setProgress]               = useState<number>(0);
    const [volume, setVolume]                   = useState<number>(0.7);
    const [isDragging, setIsDragging]           = useState<boolean>(false);
    const [isDraggingVolume, setIsDraggingVolume] = useState<boolean>(false);

    useEffect(() => {
        const processed: Track[] = rawAudioUrls.map((url, index) => {
            const fileName = url.split('/').pop()?.replace('.mp3', '') ?? '';
            const [author, title] = fileName.split(' - ');
            return {
                id: `track-${index}`,
                url,
                title: title || fileName,
                author: author || 'Исполнитель',
                cover: `https://picsum.photos/id/${index + 10}/200/200`,
                duration: '3:45',
            };
        });
        setPlaylist(processed);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!audioRef.current) return;
            if (e.key === 'ArrowRight') audioRef.current.currentTime += 5;
            else if (e.key === 'ArrowLeft') audioRef.current.currentTime -= 5;
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;
        audioRef.current.volume = volume;
        if (isPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack, volume]);

    const handleTimeUpdate = () => {
        if (!isDragging && audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
        }
    };

    const calculatePercent = (
        e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent,
        ref: React.RefObject<HTMLDivElement | null>
    ): number => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const clientX =
            'touches' in e
                ? e.touches[0].clientX
                : (e as MouseEvent | React.MouseEvent).clientX;
        const clickX = clientX - rect.left;
        return Math.min(Math.max(clickX / rect.width, 0), 1);
    };

    const handleSeek = (e: MouseEvent | React.MouseEvent) => {
        if (!audioRef.current || !progressBarRef.current) return;
        const percent = calculatePercent(e, progressBarRef);
        audioRef.current.currentTime = percent * audioRef.current.duration;
        setProgress(percent * 100);
    };

    const handleVolumeSeek = (e: MouseEvent | React.MouseEvent) => {
        if (!volumeBarRef.current) return;
        setVolume(calculatePercent(e, volumeBarRef));
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) handleSeek(e);
            if (isDraggingVolume) handleVolumeSeek(e);
        };
        const onMouseUp = () => {
            setIsDragging(false);
            setIsDraggingVolume(false);
        };
        if (isDragging || isDraggingVolume) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, isDraggingVolume]);

    const playNext = () => {
        if (!currentTrack) return;
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const nextIndex = isShuffle
            ? Math.floor(Math.random() * playlist.length)
            : (currentIndex + 1) % playlist.length;
        setCurrentTrack(playlist[nextIndex]);
        setIsPlaying(true);
    };

    const playPrev = () => {
        if (!currentTrack) return;
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrack(playlist[prevIndex]);
        setIsPlaying(true);
    };

    const formatTime = (time: number | undefined): string => {
        if (!time || isNaN(time)) return '0:00';
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="spotify-container">
            <div className="spotify-playlist">
                <div className="scroll-area">
                    {playlist.map((track, index) => {
                        const isCurrent = currentTrack?.id === track.id;
                        return (
                            <div
                                key={track.id}
                                className={`track-row ${isCurrent ? 'active' : ''}`}
                                onClick={() => {
                                    if (isCurrent) {
                                        setIsPlaying(!isPlaying);
                                    } else {
                                        setCurrentTrack(track);
                                        setIsPlaying(true);
                                    }
                                }}
                            >
                                <div className="track-index-box">
                                    {isCurrent ? (
                                        isPlaying ? (
                                            <div className="playing-animation">
                                                <span className="bar" /><span className="bar" /><span className="bar" /><span className="bar" />
                                            </div>
                                        ) : (
                                            <span className="orange-text" style={{ fontSize: '12px' }}>||</span>
                                        )
                                    ) : (
                                        <span className="track-index">{index + 1}</span>
                                    )}
                                </div>

                                <div className="track-main">
                                    <img src={track.cover} alt="" />
                                    <div className="track-names">
                                        <span className={`t-name ${isCurrent ? 'orange-text' : ''}`}>{track.title}</span>
                                        <span className="t-author">{track.author}</span>
                                    </div>
                                </div>
                                <span className="track-duration">{track.duration}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="spotify-player">
                {currentTrack && (
                    <audio
                        ref={audioRef}
                        src={currentTrack.url}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => isRepeat ? audioRef.current?.play() : playNext()}
                    />
                )}

                <div className="player-left">
                    {currentTrack && (
                        <>
                            <img src={currentTrack.cover} alt="" />
                            <div className="player-track-info">
                                <div className="p-title">{currentTrack.title}</div>
                                <div className="p-author">{currentTrack.author}</div>
                            </div>
                        </>
                    )}
                </div>

                <div className="player-center">
                    <div className="controls">
                        <button
                            className={`btn-svg ${isShuffle ? 'orange' : 'white'}`}
                            onClick={() => setIsShuffle(!isShuffle)}
                        >
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor"><path d="M10.9191 0V2.00139H8.91284C8.27808 2.00139 7.5772 2.28707 6.99101 2.83309C6.40485 3.3791 5.76785 4.18912 4.75652 5.52121C3.74064 6.85926 3.17491 7.66785 2.82211 8.03122C2.46931 8.39458 2.52606 8.3634 2.01258 8.3634H0V9.95391H2.01258C2.78349 9.95391 3.55888 9.65682 4.10692 9.09238C4.65497 8.52794 5.17223 7.74604 6.16891 6.43326C7.17015 5.11449 7.80669 4.33401 8.21655 3.95224C8.62639 3.57047 8.64403 3.59189 8.91288 3.59189H10.9192V5.68025L14 2.84053L10.9191 0ZM0 2.00137V3.59188H2.01258C2.52606 3.59188 2.46931 3.55988 2.82211 3.92324C3.0491 4.15702 3.42302 4.65282 3.88949 5.27766C3.95271 5.19404 3.98251 5.15373 4.04942 5.06558C4.30352 4.7309 4.53432 4.42893 4.74753 4.15353C4.82173 4.05768 4.88389 3.98208 4.95419 3.89258C4.63895 3.47265 4.3764 3.13961 4.10692 2.86207C3.55888 2.29762 2.78349 2.00137 2.01258 2.00137H0ZM10.9191 6.31977V8.36339H8.91284C8.64401 8.36339 8.62638 8.38399 8.21653 8.00222C7.94543 7.74969 7.56149 7.30204 7.05209 6.66022C6.99048 6.74079 6.94062 6.80456 6.87598 6.8897C6.51932 7.35948 6.27342 7.69841 6.01525 8.04943C6.38153 8.49667 6.69332 8.84407 6.99102 9.12135C7.57717 9.66739 8.27807 9.95388 8.91285 9.95388H10.9191V12L14 9.16031L10.9191 6.31977Z" /></svg>
                        </button>
                        <button className="nav-btn" onClick={playPrev}>⏮</button>
                        <button className="play-circle" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button className="nav-btn" onClick={playNext}>⏭</button>
                        <button
                            className={`btn-svg ${isRepeat ? 'orange' : 'white'}`}
                            onClick={() => setIsRepeat(!isRepeat)}
                        >
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="currentColor"><path d="M12 5.49509V6.16175C12 8.37091 10.2091 10.1617 8 10.1617H3.05778L4.27616 11.3807L3.33334 12.3235L0.504906 9.49509L3.33334 6.66666L4.27616 7.60947L3.05778 8.82841H8C9.45803 8.82841 10.6427 7.65828 10.6663 6.20584L10.6667 6.16178V5.49509H12ZM8.66666 0L11.4951 2.82844L8.66666 5.65687L7.72384 4.71406L8.94219 3.49509H4C2.54197 3.49509 1.35725 4.66525 1.33369 6.11766L1.33334 6.16175L1.33331 6.82841H0V6.16175C0 3.97472 1.75522 2.19762 3.93384 2.16228L4 2.16175H8.94222L7.72384 0.942813L8.66666 0Z" /></svg>
                        </button>
                    </div>

                    <div className="progress-bar-container">
                        <span className="time-text">{formatTime(audioRef.current?.currentTime)}</span>
                        <div
                            className="progress-bg"
                            ref={progressBarRef}
                            onMouseDown={(e) => { if (currentTrack) setIsDragging(true); handleSeek(e); }}
                        >
                            <div className="progress-fill" style={{ width: `${progress}%` }}>
                                <div className="progress-knob" />
                            </div>
                        </div>
                        <span className="time-text">{formatTime(audioRef.current?.duration)}</span>
                    </div>
                </div>

                <div className="player-right">
                    <span onClick={() => setVolume(volume > 0 ? 0 : 0.7)} style={{ cursor: 'pointer' }}>
                        {volume === 0 ? '🔇' : '🔊'}
                    </span>
                    <div
                        className="volume-bg"
                        ref={volumeBarRef}
                        onMouseDown={(e) => { setIsDraggingVolume(true); handleVolumeSeek(e); }}
                    >
                        <div className="volume-fill" style={{ width: `${volume * 100}%` }}>
                            <div className="progress-knob" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
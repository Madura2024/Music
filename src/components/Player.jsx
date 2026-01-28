import React from 'react';

const Player = ({
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    progress,
    onSeek,
    duration,
    currentTime,
    formatTime,
    volume,
    setVolume
}) => {
    return (
        <div className="player-section">
            <div className="album-art-wrapper">
                <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className={`album-art ${isPlaying ? 'rotating' : 'rotating paused'}`}
                />
            </div>

            <div className="song-info">
                <h2 className="glow-text">{currentSong.title}</h2>
                <p>{currentSong.artist}</p>
            </div>

            <div className="progress-container">
                <input
                    type="range"
                    className="progress-bar"
                    value={progress}
                    step="0.1"
                    onChange={(e) => onSeek(parseFloat(e.target.value))}
                />
                <div className="time-info">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="controls">
                <button className="btn-icon" onClick={prevSong}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                </button>
                <button className="btn-icon play-btn" onClick={togglePlay}>
                    {isPlaying ? (
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
                <button className="btn-icon" onClick={nextSong}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                </button>
            </div>

            <div className="volume-container">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
                <input
                    type="range"
                    className="progress-bar volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
            </div>
        </div>
    );
};

export default Player;

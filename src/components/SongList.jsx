import React from 'react';

const SongList = ({ songs, currentSongIndex, setCurrentSongIndex, setIsPlaying }) => {
    return (
        <div className="song-list-section">
            <h3 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Playlist</h3>
            {songs.map((song, index) => (
                <div
                    key={song.id}
                    className={`song-item ${index === currentSongIndex ? 'active' : ''}`}
                    onClick={() => {
                        setCurrentSongIndex(index);
                        setIsPlaying(true);
                    }}
                >
                    <img src={song.cover} alt={song.title} className="list-art" />
                    <div className="list-info">
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                    </div>
                    {index === currentSongIndex && (
                        <div className="playing-indicator">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SongList;

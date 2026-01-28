import React, { useState, useRef, useEffect } from 'react';
import { songs } from './data/songs';
import Player from './components/Player';
import SongList from './components/SongList';
import './App.css';

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef(new Audio(songs[0].url));
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Auto-play blocked or error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    audioRef.current.src = currentSong.url;
    if (isPlaying) audioRef.current.play();
  }, [currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const onSeek = (val) => {
    const time = (val / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(val);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="app-container">
      <div className="main-content glass">
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          nextSong={nextSong}
          prevSong={prevSong}
          progress={progress}
          onSeek={onSeek}
          duration={duration}
          currentTime={audioRef.current.currentTime}
          formatTime={formatTime}
          volume={volume}
          setVolume={setVolume}
        />
        <SongList
          songs={songs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}

export default App;

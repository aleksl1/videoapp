import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoPlayerContextType {
  currentVideoId: string | null;
  isMinimized: boolean;
  setCurrentVideo: (videoId: string) => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  // TODO: Implement video player context logic

  return (
    <VideoPlayerContext.Provider
      value={{
        currentVideoId,
        isMinimized,
        setCurrentVideo: setCurrentVideoId,
        minimize: () => setIsMinimized(true),
        maximize: () => setIsMinimized(false),
        close: () => {
          setCurrentVideoId(null);
          setIsMinimized(false);
        },
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayerContext() {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayerContext must be used within VideoPlayerProvider');
  }
  return context;
}

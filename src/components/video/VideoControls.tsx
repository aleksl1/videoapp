import { COLORS, fontConfig, SPACING } from "@/src/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AirplayIcon from "../icons/videoControls/AirplayIcon";
import BackwardIcon from "../icons/videoControls/BackwardIcon";
import ForwardIcon from "../icons/videoControls/ForwardIcon";
import FullscreenIcon from "../icons/videoControls/FullscreenIcon";
import LeftArrowIcon from "../icons/videoControls/LeftArrowIcon";
import PauseIcon from "../icons/videoControls/PauseIcon";
import PlayIcon from "../icons/videoControls/PlayIcon";
import VolumeIcon from "../icons/videoControls/VolumeIcon";

interface VideoControlsProps {
  paused: boolean;
  muted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMute: () => void;
  onSeek: (time: number) => void;
  onSeekStart: () => void;
  onSeekEnd: (time: number) => void;
  onBackward: () => void;
  onForward: () => void;
  onFullscreen: () => void;
  onAirplay?: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  paused,
  muted,
  currentTime,
  duration,
  onPlayPause,
  onMute,
  onSeek,
  onSeekStart,
  onSeekEnd,
  onBackward,
  onForward,
  onFullscreen,
  onAirplay,
}) => {
  const router = useRouter();
  const [showControls, setShowControls] = useState(true);
  const [opacity] = useState(new Animated.Value(1));
  const [seekTime, setSeekTime] = useState(currentTime);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!isSeeking) {
      setSeekTime(currentTime);
    }
  }, [currentTime, isSeeking]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (showControls && !paused) {
      timeout = setTimeout(() => {
        hideControls();
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [showControls, paused]);

  const hideControls = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowControls(false));
  };

  const toggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      setShowControls(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
    onSeekStart();
  };

  const handleSeekChange = (value: number) => {
    setSeekTime(value);
  };

  const handleSeekEnd = (value: number) => {
    setIsSeeking(false);
    setSeekTime(value);
    onSeekEnd(value);
  };

  const handleProgressBarPress = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const target = event.currentTarget as any;

    target.measure((_x: number, _y: number, width: number) => {
      const position = locationX / width;
      const newTime = position * duration;
      handleSeekEnd(newTime);
    });
  };

  return (
    <Pressable style={styles.container} onPress={toggleControls}>
      {showControls && (
        <Animated.View style={[styles.controlsOverlay, { opacity }]}>
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <LeftArrowIcon width={24} height={24} stroke={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.topRightControls}>
              <TouchableOpacity style={styles.iconButton} onPress={onMute}>
                <VolumeIcon
                  width={24}
                  height={24}
                  stroke={muted ? COLORS.error : COLORS.white}
                />
              </TouchableOpacity>
              {onAirplay && (
                <TouchableOpacity style={styles.iconButton} onPress={onAirplay}>
                  <AirplayIcon width={24} height={24} stroke={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Center Controls */}
          <View style={styles.centerControls}>
            <TouchableOpacity style={styles.controlButton} onPress={onBackward}>
              <BackwardIcon width={24} height={24} stroke={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.playButton]}
              onPress={onPlayPause}
            >
              {paused ? (
                <PlayIcon width={32} height={32} stroke={COLORS.white} />
              ) : (
                <PauseIcon width={32} height={32} stroke={COLORS.white} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={onForward}>
              <ForwardIcon width={24} height={24} stroke={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <View style={styles.bottomControlsTop}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formatTime(isSeeking ? seekTime : currentTime)}
                </Text>
                <Text style={styles.timeSeparator}>/</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>

              <TouchableOpacity
                style={styles.fullscreenButton}
                onPress={onFullscreen}
              >
                <FullscreenIcon width={24} height={24} stroke={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Progress Bar - Full Width at Bottom */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarTrack}>
              {/* Background track */}
              <View style={styles.progressBarBackground} />
              {/* Filled track */}
              <View
                style={[
                  styles.progressBarFilled,
                  {
                    width: `${
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    }%`,
                  },
                ]}
              />
              {/* Thumb */}
              <Pressable
                style={[
                  styles.progressBarThumb,
                  {
                    left: `${
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    }%`,
                  },
                ]}
                onPress={(e) => e.stopPropagation()}
              />
              {/* Touch area for seeking */}
              <Pressable
                style={styles.progressBarTouchArea}
                onPress={handleProgressBarPress}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "space-between",
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: 0,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topRightControls: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  iconButton: {
    padding: SPACING.sm,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  centerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xl * 2,
  },
  controlButton: {
    padding: SPACING.sm,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
  },
  playButton: {
    padding: SPACING.sm,
  },
  bottomControls: {
    paddingBottom: SPACING.sm,
  },
  bottomControlsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginStart: -SPACING.sm,
  },
  timeText: {
    color: COLORS.white,
    ...fontConfig.xxs_semi_bold,
  },
  timeSeparator: {
    color: COLORS.white,
    ...fontConfig.xxs_semi_bold,
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  progressBarTrack: {
    width: "100%",
    height: 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  progressBarBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressBarFilled: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 4,
    backgroundColor: COLORS.error,
    borderRadius: 2,
  },
  progressBarThumb: {
    position: "absolute",
    bottom: -4, // Center vertically on the 4px track
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.error,
    marginLeft: -6, // Center the thumb on the position
    zIndex: 2,
  },
  progressBarTouchArea: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -12,
    bottom: -4,
    zIndex: 1,
  },
  fullscreenButton: {
    marginBottom: SPACING.md,
  },
});

export default VideoControls;

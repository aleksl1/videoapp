import { COLORS, SPACING } from "@/src/constants/theme";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
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
import VolumeMuteIcon from "../icons/VolumeMuteIcon";

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
                {muted ? (
                  <VolumeMuteIcon
                    width={24}
                    height={24}
                    stroke={COLORS.white}
                  />
                ) : (
                  <VolumeIcon width={24} height={24} stroke={COLORS.white} />
                )}
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
              <BackwardIcon width={40} height={40} stroke={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.playButton]}
              onPress={onPlayPause}
            >
              {paused ? (
                <PlayIcon width={48} height={48} stroke={COLORS.white} />
              ) : (
                <PauseIcon width={48} height={48} stroke={COLORS.white} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={onForward}>
              <ForwardIcon width={40} height={40} stroke={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(isSeeking ? seekTime : currentTime)}
              </Text>
              <Text style={styles.timeSeparator}>/</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <View style={styles.progressContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={isSeeking ? seekTime : currentTime}
                onValueChange={handleSeekChange}
                onSlidingStart={handleSeekStart}
                onSlidingComplete={handleSeekEnd}
                minimumTrackTintColor={COLORS.error}
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor={COLORS.error}
              />
            </View>

            <TouchableOpacity
              style={styles.fullscreenButton}
              onPress={onFullscreen}
            >
              <FullscreenIcon width={24} height={24} stroke={COLORS.white} />
            </TouchableOpacity>
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
    padding: SPACING.md,
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
    padding: SPACING.xs,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
  },
  centerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xl * 2,
  },
  controlButton: {
    padding: SPACING.md,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
  },
  playButton: {
    padding: SPACING.lg,
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 100,
  },
  timeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  timeSeparator: {
    color: COLORS.white,
    fontSize: 14,
    marginHorizontal: 4,
  },
  progressContainer: {
    flex: 1,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  fullscreenButton: {
    padding: SPACING.xs,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
  },
});

export default VideoControls;

"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PauseIcon,
  PlayIcon,
  SquareIcon,
  Volume2Icon,
  VolumeXIcon,
  DownloadIcon,
} from "lucide-react";
import { Loader2 } from "lucide-react";

interface AudioPlayerProps {
  url: string;
}

export function AudioPlayer({ url }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#cbd5e1",
      progressColor: "#3b82f6",
      height: 80,
    });

    wavesurfer.load(url);
    wavesurfer.setVolume(volume);
    wavesurferRef.current = wavesurfer;

    setIsLoading(true);

    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration());
      setIsLoading(false);
    });

    wavesurfer.on("audioprocess", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      try {
        wavesurfer.destroy();
      } catch {}
    };
  }, [url]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const togglePlayback = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.playPause();
    setIsPlaying(wavesurferRef.current.isPlaying());
  };

  const stopPlayback = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    if (!wavesurferRef.current) return;
    const mute = !isMuted;
    wavesurferRef.current.setVolume(mute ? 0 : volume);
    setIsMuted(mute);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "recording.wav";
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <Card className="xl:w-1/2">
      <CardContent className="p-4 space-y-4">
        <div ref={containerRef} />

        {isLoading && (
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            Loading audio...
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            onClick={togglePlayback}
            variant="outline"
            className="cursor-pointer"
          >
            {isPlaying ? (
              <PauseIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5" />
            )}
          </Button>

          <Button
            onClick={stopPlayback}
            variant="outline"
            className="cursor-pointer"
          >
            <SquareIcon className="h-5 w-5" />
          </Button>

          <Button
            onClick={toggleMute}
            variant="outline"
            className="cursor-pointer"
          >
            {isMuted ? (
              <VolumeXIcon className="h-5 w-5" />
            ) : (
              <Volume2Icon className="h-5 w-5" />
            )}
          </Button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 cursor-pointer"
          />

          <div className="text-sm text-muted-foreground ml-auto">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="cursor-pointer"
          >
            <DownloadIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

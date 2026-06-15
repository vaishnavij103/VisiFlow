"use client"

import React, { useRef, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, CheckCircle2 } from "lucide-react";
import Image from 'next/image';

interface CameraCaptureProps {
  onCapture: (imageUri: string) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 400, height: 400 } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUrl);
    onCapture(dataUrl);
    stopCamera();
  }, [stream, onCapture]);

  const reset = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square max-w-[300px] mx-auto overflow-hidden rounded-full border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center">
        {capturedImage ? (
          <Image src={capturedImage} alt="Profile" fill className="object-cover" />
        ) : stream ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover scale-x-[-1]" 
          />
        ) : (
          <div className="text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <Button onClick={startCamera} size="lg" className="rounded-full shadow-lg">Start Camera</Button>
          </div>
        )}
      </div>

      {stream && (
        <div className="flex justify-center">
          <Button onClick={capture} variant="default" className="rounded-full w-16 h-16 p-0 shadow-lg">
            <div className="w-12 h-12 rounded-full border-4 border-white" />
          </Button>
        </div>
      )}

      {capturedImage && (
        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="outline" className="rounded-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Retake
          </Button>
          <div className="flex items-center text-accent font-bold">
            <CheckCircle2 className="w-5 h-5 mr-1" /> Ready
          </div>
        </div>
      )}
    </div>
  );
}

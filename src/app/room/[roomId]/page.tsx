"use client";
import React from "react";

import { useParams } from "next/navigation";
import VideoCall from "@/components/videoCall";

const RoomPage = () => {
  const { roomId } = useParams();

  if (!roomId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Room ID is required</h1>
        </div>
      </div>
    );
  }

  return <VideoCall roomId={roomId} />;
};

export default RoomPage;

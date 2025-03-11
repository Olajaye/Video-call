import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useSearchParams } from "next/navigation";



const VideoCall = ({ roomId }: any) => {
  const zegoRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null)

  const searchParam = useSearchParams()
  const username = searchParam.get("username") || "Meet to aspier"

  useEffect(()=>{
    const appID = parseInt("1029344787")
    const serverSecret = "b1a7bf2c6d881d31750f4156a68249d6"

    if(!appID || !serverSecret || !containerRef){
      alert("Miss details")
      return
    }

    const userID = username.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000).toString()

    try{
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userID,
        username,
        720
      );
      zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);
      zegoRef.current.joinRoom({
        container: containerRef.current,
        scenaro: {
          mode: ZegoUIKitPrebuilt.GroupCall
        },
        
      })
    }catch(err){
      alert(err)
    }

    return ()=>{
      if(zegoRef.current){
        zegoRef.current.destroy();
        zegoRef.current = null
      }
    }
  }, [roomId, username])
  return (
    <div ref={containerRef} className="h-screen  w-full"/>
  )
};

export default VideoCall;

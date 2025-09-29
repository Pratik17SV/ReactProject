 import { useEffect, useState } from "react";
 import { useNavigate, useParams } from "react-router-dom";
 import useAuthUser from "../hooks/useAuthUser";
 import { useQuery } from "@tanstack/react-query";
 import { getStreamToken } from "../lib/api";
 import {
   StreamVideo,
   StreamVideoClient,
   StreamCall,
   CallControls,
   SpeakerLayout,
   StreamTheme,
   CallingState,
   useCallStateHooks,
 } from "@stream-io/video-react-sdk";
 import "@stream-io/video-react-sdk/dist/css/styles.css";
 import { toast } from "react-hot-toast";
 import PageLoader from "../components/PageLoader";

 const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

 const CallPage = () => {
   const { id: callId } = useParams();
   const [client, setClient] = useState(null);
   const [call, setCall] = useState(null);
   const [isConnecting, setIsConnecting] = useState(true);

   const { authUser, isLoading } = useAuthUser();

   const { data: tokenData } = useQuery({
     queryKey: ["streamToken"],
     queryFn: getStreamToken,
     enabled: !!authUser,
   });

   useEffect(() => {
     const initCall = async () => {
       const token = tokenData?.token ?? tokenData;
       if (!token || !authUser || !callId) return;

       try {
         const user = {
           id: authUser._id,
           name: authUser.name,
           image: authUser.avatar,
         };

         const videoClient = new StreamVideoClient({
           apiKey: STREAM_API_KEY,
           user,
           token,
         });

         const callInstance = videoClient.call("default", callId);

         await callInstance.join({ create: true });

         setClient(videoClient);
         setCall(callInstance);
       } catch (error) {
         console.error("Error joining call:", error);
         toast.error("Could not join the call. Please try again.");
       } finally {
         setIsConnecting(false);
       }
     };

     initCall();

     return () => {
       // optional: leave and disconnect on unmount
       (async () => {
         try {
           await call?.leave();
         } catch (_) {}
       })();
     };
   }, [tokenData, authUser, callId]);

   if (!callId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Invalid call link.</p>
      </div>
    );
  }

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;

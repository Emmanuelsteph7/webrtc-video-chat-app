import React, { useState, useRef, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io.connect("/");
// const socket = io.connect("https://webrtc-video-chap-app.herokuapp.com/");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [clickAnswer, setClickAnswer] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // The MediaDevices.getUserMedia() method prompts the user for permission to use a media input which produces a MediaStream with tracks containing the requested types of media.
  useEffect(() => {
    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = async () => {
    try {
      const stream2 = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(stream2);

      myVideo.current.srcObject = stream2;

      setCallAccepted(true);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream2,
      });

      peer.on("signal", (data) => {
        socket.emit("answercall", { signal: data, to: call.from });
      });

      peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });

      peer.signal(call.signal);

      connectionRef.current = peer;
    } catch (error) {
      console.log(error);
    }
  };

  const callUser = async (id) => {
    try {
      const stream2 = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(stream2);

      myVideo.current.srcObject = stream2;

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream2,
      });

      peer.on("signal", (data) => {
        socket.emit("calluser", {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });

      peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });

      socket.on("callaccepted", (signal) => {
        setCallAccepted(true);

        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (error) {
      console.log(error);
    }
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        setStream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        idToCall,
        setIdToCall,
        clickAnswer,
        setClickAnswer,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

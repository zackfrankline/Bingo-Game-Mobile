// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// // src/context/SocketContext.jsx
// import { socket } from "../socket";

// interface SocketProviderProps {
//   children: ReactNode;
// }

// interface IWebSocketContext{
//     gameCode: String,

// }

// const WebSocketContext = createContext(null);

// export const SocketProvider = ({ children }: SocketProviderProps) => {
//   const [eventData, setEventData] = useState(null);

//   useEffect(() => {
//     // 1. Listen for a specific event from the server
//     function onCustomEvent(value: unknown) {
//       setEventData(value);
//     }

//     socket.on("my_server_event", onCustomEvent);

//     // 2. Clean up listeners when the provider unmounts
//     return () => {
//       socket.off("my_server_event", onCustomEvent);
//     };
//   }, []);

//   return (
//     <WebSocketContext.Provider value={{ socket, eventData }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// // Custom hook for easier context consumption
// export const useSocketContext = () => useContext(WebSocketContext);

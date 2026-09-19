// src/socket.js
import { io } from 'socket.io-client';

const URL = 'http://localhost:4000'; // Replace with your server URL

// Pass autoConnect: false if you want to explicitly connect later
export const socket = io(URL, { autoConnect: false }); 
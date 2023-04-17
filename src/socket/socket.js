import { io } from 'socket.io-client';

const socket = io.connect('https://SandS-replit-rebuild.luke-schnetlage.repl.co');

export default socket;
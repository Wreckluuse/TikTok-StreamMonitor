import ioClient from 'socket.io-client';

const ENDPOINT = 'https://tiktok-streammonitor-eventsmicroservice.azurewebsites.net/';
const socket = ioClient(ENDPOINT, {
    extraHeaders: {
        "chat-traffic": "test"
    }
})

export const io = socket;
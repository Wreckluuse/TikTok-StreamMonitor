import ioClient from 'socket.io-client';

const ENDPOINT = 'https://tiktok-streammonitor-eventsmicroservice.azurewebsites.net:' + process.env.PORT;
const socket = ioClient(ENDPOINT, {
    extraHeaders: {
        "chat-traffic": "test"
    }
})

export const io = socket;
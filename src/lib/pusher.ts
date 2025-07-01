import Pusher from "pusher";

export const pusher = new Pusher({
    appId: "2015996",
    key: "89b3bb8cda6c1d5914c5",
    secret: "c3d101e2a7198422261d",
    cluster: "ap2",
    useTLS: true
});

// pusher.trigger("my-channel", "my-event", {
//     message: "hello world"
// });
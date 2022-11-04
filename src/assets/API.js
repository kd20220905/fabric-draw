import axios from "axios";

const serverRequest = axios.create({
  baseURL: "https://fabric-2022-10-27.herokuapp.com/",
});

// HomeView
export const apiNewRoom = (data) => serverRequest.post("/newRoom", data);
export const apiInRoom = (data) => serverRequest.post("/InRoom", data);

// QuessRoom
export const apiRoomChat = (roomId, data) =>
  serverRequest.post("/roomChat/" + roomId, data);

//DrawRoom
export const apiRoomAnswer = (roomId, data) =>
  serverRequest.post("/roomAnswer/" + roomId, data);

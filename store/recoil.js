import { atom } from "recoil";

export const selectedUserState = atom({
  key: "selectedUser",
  default: { id: null, name: "LOBBY" },
});

export const selectedRoomState = atom({
  key: "selectedRoom",
  default: { id: null, roomName: null, isPrivate: false },
});

export const isChatroomState = atom({
  key: "isChatroom",
  default: false,
});

export const messageHeaderNameState = atom({
  key: "messageHeaderName",
  default: "LOBBY",
});

export const privateMessageCountState = atom({
  key: "privateMessageCount",
  default: 0,
});

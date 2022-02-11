import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useRecoilState } from "recoil";
import {
  selectedUserState,
  selectedRoomState,
  isChatroomState,
} from "../../store/recoil";
import ContactList from "../ContactList";
import RoomList from "../RoomList";

const GET_CHATROOM = gql`
  subscription MyQuery {
    room(order_by: { roomName: asc }) {
      roomName
      isPrivate
      id
    }
  }
`;

const Chatroom = ({ search }) => {
  const { user } = useAuth0();
  const { data: roomData } = useSubscription(GET_CHATROOM);

  console.log(roomData?.room);
  const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
  const [isChatroom, setIsChatroom] = useRecoilState(isChatroomState);

  console.log(search);
  return (
    <div>
      <li>
        <p className="pt-3 pl-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Public Chatrooms
        </p>
        {roomData?.room.map((room) => (
          <div
            key={room.id}
            onClick={() => {
              setIsChatroom(true);
              setSelectedRoom(room);
            }}
          >
            <RoomList room={room} />
          </div>
        ))}
      </li>
    </div>
  );
};

export default Chatroom;

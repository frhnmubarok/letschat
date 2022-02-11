import { gql, useQuery } from "@apollo/client";
import React from "react";
import Image from "next/image";
import { HiChatAlt2 } from "react-icons/hi";
import { Avatar } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { messageHeaderNameState } from "../../store/recoil";

const GET_USERS = gql`
  query MyQuery($order_by: [users_order_by!] = { name: desc }) {
    users(order_by: $order_by) {
      id
      name
      picture
    }
  }
`;

const RoomList = ({ room }) => {
  const { roomName, isPrivate, id } = room;
  const [messageHeaderName, setMessageHeaderName] = useRecoilState(
    messageHeaderNameState
  );
  return (
    <a
      key={id}
      onClick={() => {
        setMessageHeaderName(roomName);
      }}
      className="flex cursor-pointer items-center px-3 py-1 text-sm transition duration-150 ease-in-out hover:rounded-lg hover:bg-gray-100 focus:outline-none"
    >
      <HiChatAlt2 className="h-10 w-10 text-gray-500" />
      <div className="w-full">
        <div className="flex justify-between">
          <span className="ml-2 block font-semibold text-gray-600">
            {roomName}
          </span>
        </div>
      </div>
    </a>
  );
};

export default RoomList;

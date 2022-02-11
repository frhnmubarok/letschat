import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  isChatroomState,
  selectedRoomState,
  selectedUserState,
} from "../../store/recoil";

const INSERT_MESSAGE = gql`
  mutation MyMutation(
    $fromUserId: String = ""
    $message: String = ""
    $toUserId: String = ""
  ) {
    insert_messages_one(
      object: {
        fromUserId: $fromUserId
        message: $message
        toUserId: $toUserId
      }
    ) {
      id
    }
  }
`;

const INSERT_ROOM_MESSAGE = gql`
  mutation MyMutation2(
    $fromUserId: String = ""
    $message: String = ""
    $toRoomId: uuid = ""
  ) {
    insert_room_messages_one(
      object: {
        fromUserId: $fromUserId
        message: $message
        toRoomId: $toRoomId
      }
    ) {
      id
    }
  }
`;

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
  const [isChatroom, setIsChatroom] = useRecoilState(isChatroomState);

  const { user } = useAuth0();
  const [insertMessage] = useMutation(INSERT_MESSAGE, {
    variables: {
      fromUserId: user?.sub,
      message,
      toUserId: selectedUser?.id,
    },
  });
  const [insertRoomMessage] = useMutation(INSERT_ROOM_MESSAGE, {
    variables: {
      fromUserId: user?.sub,
      message,
      toRoomId: selectedRoom?.id,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    isChatroom ? insertRoomMessage() : insertMessage();
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="justify-end">
      <div className="flex w-full items-center justify-between p-3">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Message"
          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <button type="submit">
          <svg
            className="h-5 w-5 origin-center rotate-90 transform text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;

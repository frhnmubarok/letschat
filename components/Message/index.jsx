/* eslint-disable @next/next/no-img-element */
import { gql, useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import {
  isChatroomState,
  privateMessageCountState,
  selectedRoomState,
  selectedUserState,
} from "../../store/recoil";
import MessageBubble from "../MessageBubble";

const GET_MESSAGES = gql`
  subscription MyQuery($where: messages_bool_exp = {}) {
    messages(where: $where, order_by: { createdAt: asc }) {
      id
      fromUserId
      message
      fromUser {
        name
        picture
      }
      createdAt
      toUserId
    }
  }
`;

const GET_CHATROOM_MESSAGES = gql`
  subscription MyQuery($where: room_messages_bool_exp = {}) {
    room_messages(where: $where) {
      fromUserId
      id
      message
      user {
        name
        picture
      }
      toRoomId
      room {
        roomName
        id
      }
      createdAt
    }
  }
`;

const Message = () => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
  const [isChatroom, setIsChatroom] = useRecoilState(isChatroomState);
  const [privateMessageCount, setPrivateMessageCount] = useRecoilState(
    privateMessageCountState
  );
  const { user } = useAuth0();
  let userParams = { where: {} };
  let roomParams = { where: {} };
  let privateMessageLength = 0;
  if (selectedUser && !selectedUser.id) {
    userParams.where = {
      toUserId: {
        _is_null: true,
      },
    };
  } else if (selectedUser && selectedUser.id) {
    userParams.where = {
      _or: [
        {
          fromUserId: {
            _eq: user.sub,
          },
          toUserId: {
            _eq: selectedUser.id,
          },
        },
        {
          fromUserId: {
            _eq: selectedUser.id,
          },
          toUserId: {
            _eq: user.sub,
          },
        },
      ],
    };
  }
  if (selectedRoom && selectedRoom.id) {
    roomParams.where = {
      toRoomId: {
        _eq: selectedRoom.id,
      },
    };
  }

  const { data: messagesData } = useSubscription(GET_MESSAGES, {
    variables: userParams,
  });
  const { data: privateMessageData } = useSubscription(GET_MESSAGES, {
    variables: {
      where: {
        toUserId: {
          _eq: user.sub,
        },
      },
    },
  });
  const { data: roomMessagesData } = useSubscription(GET_CHATROOM_MESSAGES, {
    variables: roomParams,
  });

  useEffect(() => {
    if (privateMessageData?.messages.length > 0 && privateMessageCount === 0) {
      setPrivateMessageCount(privateMessageData.messages.length);
    }
  }, [
    privateMessageCount,
    privateMessageData?.messages.length,
    setPrivateMessageCount,
  ]);

  useEffect(() => {
    if (
      privateMessageData?.messages.length > privateMessageCount &&
      privateMessageCount !== 0
    ) {
      const messagesArr =
        privateMessageData.messages[privateMessageData.messages.length - 1];
      const newMessage = messagesArr.message;
      const senderName = messagesArr.fromUser.name;
      const senderPhoto = messagesArr.fromUser.picture;
      console.log(messagesArr);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={senderPhoto}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {senderName}
                </p>
                <p className="mt-1 block overflow-hidden text-ellipsis text-sm text-gray-500">
                  {newMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  }, [privateMessageCount, privateMessageData]);

  setTimeout(() => {
    const cb = document.getElementById("chat-content").parentElement;
    if (cb) {
      cb.scrollTop = cb.scrollHeight;
    }
  }, 200);

  return (
    <div className="relative h-[calc(100vh-192px)] w-full overflow-y-auto p-6">
      <ul className="space-y-5" id="chat-content">
        {!isChatroom &&
          messagesData?.messages.map((message) => (
            <MessageBubble
              key={message.id}
              isMe={user.sub === message.fromUserId}
              message={message.message}
              picture={message.fromUser.picture}
              name={message.fromUser.name}
              createdAt={message.createdAt}
            />
          ))}
        {isChatroom &&
          roomMessagesData?.room_messages.map((message) => (
            <MessageBubble
              key={message.id}
              isMe={user.sub === message.fromUserId}
              message={message.message}
              picture={message.user.picture}
              name={message.user.name}
              createdAt={message.createdAt}
            />
          ))}
      </ul>
    </div>
  );
};

export default Message;

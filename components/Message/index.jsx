import { gql, useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../store/recoil";
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
    }
  }
`;

const Message = () => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const { user } = useAuth0();
  let params = { where: {} };
  if (selectedUser && !selectedUser.id) {
    params.where = {
      toUserId: {
        _is_null: true,
      },
    };
  } else if (selectedUser && selectedUser.id) {
    params.where = {
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
  const { data } = useSubscription(GET_MESSAGES, { variables: params });

  setTimeout(() => {
    const cb = document.getElementById("chat-content").parentElement;
    if (cb) {
      cb.scrollTop = cb.scrollHeight;
    }
  }, 200);

  return (
    <div className="relative h-[calc(100vh-192px)] w-full overflow-y-auto p-6">
      <ul className="space-y-5" id="chat-content">
        {data?.messages.map((message) => (
          <MessageBubble
            key={message.id}
            isMe={user.sub === message.fromUserId}
            message={message.message}
            picture={message.fromUser.picture}
            name={message.fromUser.name}
            createdAt={message.createdAt}
          />
        ))}
      </ul>
    </div>
  );
};

export default Message;

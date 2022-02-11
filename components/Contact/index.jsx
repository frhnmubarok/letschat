import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useRecoilState } from "recoil";
import { isChatroomState, selectedUserState } from "../../store/recoil";
import ContactList from "../ContactList";

const GET_USERS = gql`
  query MyQuery(
    $order_by: [users_order_by!] = { name: desc }
    $_neq: String = ""
  ) {
    users(order_by: $order_by, where: { id: { _neq: $_neq } }) {
      id
      name
      picture
    }
  }
`;

const Contact = ({ search }) => {
  const { user } = useAuth0();
  const { data: usersData } = useQuery(GET_USERS, {
    variables: { order_by: { name: "asc" }, _neq: user.sub },
  });
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [isChatroom, setIsChatroom] = useRecoilState(isChatroomState);

  const users = [{ id: null, name: "LOBBY" }];
  if (usersData && usersData.users) {
    users.push(...usersData.users);
  }

  console.log(search);
  return (
    <div>
      <li>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              setIsChatroom(false);
              setSelectedUser(user);
            }}
          >
            <ContactList user={user} />
            {user.name === "LOBBY" && (
              <p className="mt-6 pb-2 pl-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                private message
              </p>
            )}
          </div>
        ))}
      </li>
    </div>
  );
};

export default Contact;

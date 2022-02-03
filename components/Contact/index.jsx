import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedUserState } from '../../store/recoil';
import ContactList from '../ContactList';

const GET_USERS = gql`
  query MyQuery($order_by: [users_order_by!] = { name: desc }) {
    users(order_by: $order_by) {
      id
      name
      picture
    }
  }
`;

const Contact = () => {
  const { user } = useAuth0();
  const { data } = useQuery(GET_USERS, { variables: { order_by: { name: 'asc' } } });
  console.log(data);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const users = [{ id: null, name: 'LOBBY' }];
  if (data && data.users) {
    users.push(...data.users);
  }
  return (
    <div>
      <li>
        {users.map((user) => (
          <div key={user.id} onClick={() => setSelectedUser(user)}>
            <ContactList user={user} />
          </div>
        ))}
      </li>
    </div>
  );
};

export default Contact;

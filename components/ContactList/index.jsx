import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Image from 'next/image';

const GET_USERS = gql`
  query MyQuery($order_by: [users_order_by!] = { name: desc }) {
    users(order_by: $order_by) {
      id
      name
      picture
    }
  }
`;

const ContactList = ({ user }) => {
  const { name, picture, id } = user;
  return (
    <a
      key={id}
      className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
      {/* <img className='object-cover w-10 h-10 rounded-full' src={picture} alt={name} /> */}
      {picture && <Image src={picture} alt={name} width={40} height={40} className='object-cover rounded-full' />}
      <div className='w-full pb-2'>
        <div className='flex justify-between'>
          <span className='block ml-2 font-semibold text-gray-600'>{name}</span>
        </div>
      </div>
    </a>
  );
};

export default ContactList;

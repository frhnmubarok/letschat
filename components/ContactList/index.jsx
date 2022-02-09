import { gql, useQuery } from "@apollo/client";
import React from "react";
import Image from "next/image";
import { HiChatAlt2 } from "react-icons/hi";
import { Avatar } from "@nextui-org/react";

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
      className="flex cursor-pointer items-center px-3 py-2 text-sm transition duration-150 ease-in-out hover:rounded-lg hover:bg-gray-100 focus:outline-none"
    >
      {/* <img className='object-cover w-10 h-10 rounded-full' src={picture} alt={name} /> */}
      {picture ? (
        // <Image src={picture} alt={name} width={40} height={40} className='rounded-full object-cover' />
        <Avatar src={picture} squared />
      ) : (
        <HiChatAlt2 className="h-12 w-12 text-gray-500" />
      )}
      <div className="w-full">
        <div className="flex justify-between">
          <span className="ml-2 block font-semibold text-gray-600">{name}</span>
        </div>
      </div>
    </a>
  );
};

export default ContactList;

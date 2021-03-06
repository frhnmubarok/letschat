import { gql, useQuery } from "@apollo/client";
import React from "react";
import Image from "next/image";
import { HiChatAlt2 } from "react-icons/hi";
import { Avatar } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { messageHeaderNameState } from "../../store/recoil";

const ContactList = ({ user }) => {
  const [messageHeaderName, setMessageHeaderName] = useRecoilState(
    messageHeaderNameState
  );

  const { name, picture, id } = user;
  return (
    <a
      key={id}
      onClick={() => {
        setMessageHeaderName(name);
      }}
      className="flex cursor-pointer items-center px-3 py-1 text-sm transition duration-150 ease-in-out hover:rounded-lg hover:bg-gray-100 focus:outline-none"
    >
      {/* <img className='object-cover w-10 h-10 rounded-full' src={picture} alt={name} /> */}
      {picture ? (
        // <Image src={picture} alt={name} width={40} height={40} className='rounded-full object-cover' />
        <Avatar src={picture} squared />
      ) : (
        <HiChatAlt2 className="h-10 w-10 text-gray-500" />
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

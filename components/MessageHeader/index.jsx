import React from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../store/recoil";

const MessageHeader = () => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  return (
    <div className="relative flex items-center p-1">
      <span className="ml-2 block font-bold text-gray-600">
        {selectedUser?.name}
      </span>
      {/* <span className='absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3'></span> */}
    </div>
  );
};

export default MessageHeader;

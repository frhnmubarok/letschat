import React from "react";
import { classNames } from "../../utils/helpers";
import Image from "next/image";
import { Avatar, Tooltip } from "@nextui-org/react";
import moment from "moment";

const MessageBubble = ({ isMe, message, picture, name, createdAt }) => {
  console.log(picture);
  return (
    <li className={classNames("flex", isMe ? "justify-end" : "justify-start")}>
      {isMe ? (
        <div className="flex items-start">
          <div>
            <div
              className={classNames(
                "relative mr-2 max-w-xl rounded-full rounded-tr-none px-4 py-2 text-gray-700 shadow",
                isMe && "bg-gray-100"
              )}
            >
              <span className="block overflow-hidden text-ellipsis">
                {message}
              </span>
            </div>
            <p className="mr-3 mt-1 text-right text-xs text-gray-500">
              {moment(createdAt).format("lll")}
            </p>
          </div>
          <Tooltip content={name} placement="topEnd">
            <Avatar src={picture} squared />
          </Tooltip>
        </div>
      ) : (
        <div className="flex items-start">
          <Tooltip content={name} placement="topStart">
            <Avatar src={picture} squared />
          </Tooltip>
          <div className="flex flex-col">
            <div
              className={classNames(
                "relative ml-2 max-w-xl rounded-full rounded-tl-none px-4 py-2 text-gray-700 shadow",
                isMe && "bg-gray-100"
              )}
            >
              <span className="block overflow-hidden text-ellipsis">
                {message}
              </span>
            </div>
            <p className="ml-3 mt-1 text-left text-xs text-gray-500">
              {moment(createdAt).format("lll")}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};

export default MessageBubble;

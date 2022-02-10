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
            <p className="mr-3 mb-1 text-right text-xs text-gray-500">
              You, {moment(createdAt).calendar()}
            </p>
            <div className="text-right">
              <div
                className={classNames(
                  "relative mr-2 inline-block max-w-xl rounded-2xl rounded-tr-none px-4 py-2 text-gray-700 shadow",
                  isMe && "bg-gray-100"
                )}
              >
                <span className="block overflow-hidden text-ellipsis text-sm">
                  {message}
                </span>
              </div>
            </div>
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
            <p className="ml-3 mb-1 text-left text-xs text-gray-500">
              {name}, {moment(createdAt).calendar()}
            </p>
            <div>
              <div
                className={classNames(
                  "relative ml-2 inline-block max-w-xl rounded-2xl rounded-tl-none px-4 py-2 text-gray-700 shadow",
                  isMe && "bg-gray-100"
                )}
              >
                <span className="block overflow-hidden text-ellipsis text-sm">
                  {message}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default MessageBubble;

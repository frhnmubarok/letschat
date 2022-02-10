import { useAuth0 } from "@auth0/auth0-react";
import { Card, Spacer, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { HiOutlineSearch, HiOutlineLogout } from "react-icons/hi";
import Contact from "../Contact";
import ContactList from "../ContactList";
import Message from "../Message";
import MessageForm from "../MessageForm";
import MessageHeader from "../MessageHeader";

const Chat = () => {
  const { logout } = useAuth0();
  const [search, setSearch] = useState("");
  return (
    <div className="mx-10">
      <div className="min-w-full rounded lg:grid lg:grid-cols-4">
        <div className="mr-3 hidden lg:col-span-1 lg:block">
          <div className="my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HiOutlineSearch className="h-6 w-6 text-gray-300" />
              </span>
              <input
                type="search"
                className="block w-full rounded-2xl bg-white p-4 pl-10 outline-none"
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div>
          </div>

          <Card
            shadow="false"
            bordered="false"
            borderWeight={0}
            className="my-3"
          >
            <ul className=" overflow-auto py-2">
              <h2 className="my-2 mb-2 ml-2 text-lg font-semibold text-gray-600">
                LetsChat
              </h2>
              <Contact search={search} />
            </ul>
          </Card>
        </div>
        <div className="lg:col-span-3 lg:block">
          <div className="w-full">
            <Card
              shadow="false"
              bordered="false"
              borderWeight={0}
              className="my-3"
            >
              <div className="flex items-center justify-between">
                <MessageHeader />
                <Tooltip content={"Logout"} placement="left">
                  <HiOutlineLogout
                    onClick={() => logout()}
                    className="mr-3 h-6 w-6 cursor-pointer text-gray-600"
                  />
                </Tooltip>
              </div>
            </Card>
            <Card
              shadow="false"
              bordered="false"
              borderWeight={0}
              className="mb-3"
            >
              <Message />
              <MessageForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

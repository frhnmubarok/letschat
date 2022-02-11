import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Radio,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { HiOutlineSearch, HiOutlineLogout } from "react-icons/hi";
import { BiMessageRoundedAdd } from "react-icons/bi";
import Contact from "../Contact";
import ContactList from "../ContactList";
import Message from "../Message";
import MessageForm from "../MessageForm";
import MessageHeader from "../MessageHeader";
import Chatroom from "../Chatroom";
import { gql, useMutation } from "@apollo/client";

const CREATE_ROOM = gql`
  mutation MyMutation(
    $roomName: String = ""
    $password: String = ""
    $isPrivate: Boolean = false
  ) {
    insert_room_one(
      object: {
        roomName: $roomName
        password: $password
        isPrivate: $isPrivate
      }
    ) {
      id
    }
  }
`;

const Chat = () => {
  const { logout } = useAuth0();
  const [search, setSearch] = useState("");
  const [inputs, setInputs] = useState({
    roomName: "",
    password: "",
    isPrivate: false,
  });
  const [visible, setVisible] = useState(false);
  const [createRoom] = useMutation(CREATE_ROOM, {
    variables: {
      roomName: inputs.roomName,
      password: inputs.password,
      isPrivate: inputs.isPrivate,
    },
  });

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRadioChange = (event) => {
    const name = event.nativeEvent.target.name;
    const value = event.nativeEvent.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createRoom();
    // alert(inputs);
    console.log(inputs);
  };

  return (
    <div className="mx-10">
      <div className="min-w-full rounded lg:grid lg:grid-cols-4">
        <div className="mr-3 hidden lg:col-span-1 lg:block">
          <div className="my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
            <ul className="max-h-[calc(100vh-128px)] overflow-auto py-2">
              <div className="flex items-center justify-between">
                <h2 className="my-2 mb-2 ml-2 text-lg font-semibold text-gray-600">
                  LetsChat
                </h2>
                <Tooltip content={"Add Chatroom"} placement="top">
                  <BiMessageRoundedAdd
                    onClick={handler}
                    className="mr-3 h-6 w-6 cursor-pointer text-gray-600"
                  />
                </Tooltip>
                <Modal
                  closeButton
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
                >
                  <form onSubmit={handleSubmit}>
                    <Modal.Header>
                      <Text id="modal-title" size={18}>
                        Create Chatroom
                      </Text>
                    </Modal.Header>
                    <Modal.Body>
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Room Name"
                        name="roomName"
                        value={inputs.roomName}
                        onChange={handleChange}
                      />
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Room Password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                      />
                      <Radio.Group initialValue={false}>
                        <Radio
                          size={"sm"}
                          onChange={handleRadioChange}
                          name="isPrivate"
                          value={false}
                        >
                          Public
                        </Radio>
                        <Radio
                          size={"sm"}
                          onChange={handleRadioChange}
                          name="isPrivate"
                          value={true}
                        >
                          Private
                        </Radio>
                      </Radio.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button auto flat color="error" onClick={closeHandler}>
                        Close
                      </Button>
                      <Button auto color={"primary"} onClick={closeHandler}>
                        <input type="submit" className="hidden" />
                        Create
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </div>
              <Chatroom />
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

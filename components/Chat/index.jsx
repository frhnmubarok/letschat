import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import Contact from '../Contact';
import ContactList from '../ContactList';
import Message from '../Message';
import MessageBubble from '../MessageBubble';
import MessageForm from '../MessageForm';
import MessageHeader from '../MessageHeader';

const Chat = () => {
  const { logout } = useAuth0();
  return (
    <div className='container mx-auto'>
      <div className='min-w-full border rounded lg:grid lg:grid-cols-3'>
        <div className='border-r border-gray-300 lg:col-span-1'>
          <div className='mx-3 my-3'>
            <div className='relative text-gray-600'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                <HiOutlineSearch className='w-6 h-6 text-gray-300' />
              </span>
              <input
                type='search'
                className='block w-full py-2 pl-10 bg-gray-100 rounded outline-none'
                name='search'
                placeholder='Search'
                required
              />
            </div>
          </div>

          <ul className='overflow-auto h-[32rem]'>
            <h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>Chats</h2>
            <Contact />
          </ul>
        </div>
        <div className='hidden lg:col-span-2 lg:block'>
          <div className='w-full'>
            <div className='flex justify-between items-center border-b border-gray-300'>
              <MessageHeader />
              <button className='mr-3' onClick={() => logout()}>
                Logout
              </button>
            </div>
            <Message />
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

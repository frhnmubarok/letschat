import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineLogout } from 'react-icons/hi';
import Contact from '../Contact';
import ContactList from '../ContactList';
import Message from '../Message';
import MessageForm from '../MessageForm';
import MessageHeader from '../MessageHeader';

const Chat = () => {
  const { logout } = useAuth0();
  const [search, setSearch] = useState('');
  return (
    <div className='container mx-auto'>
      <div className='min-w-full rounded border lg:grid lg:grid-cols-4'>
        <div className='hidden border-r border-gray-300 lg:col-span-1 lg:block'>
          <div className='mx-3 my-3'>
            <div className='relative text-gray-600'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                <HiOutlineSearch className='h-6 w-6 text-gray-300' />
              </span>
              <input
                type='search'
                className='outline-none block w-full rounded bg-gray-100 py-2 pl-10'
                name='search'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div>
          </div>

          <ul className='h-[32rem] overflow-auto'>
            <h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>Chats</h2>
            <Contact search={search} />
          </ul>
        </div>
        <div className='lg:col-span-3 lg:block'>
          <div className='w-full'>
            <div className='flex items-center justify-between border-b border-gray-300'>
              <MessageHeader />
              <HiOutlineLogout onClick={() => logout()} className='mr-5 h-6 w-6 cursor-pointer text-gray-600' />
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

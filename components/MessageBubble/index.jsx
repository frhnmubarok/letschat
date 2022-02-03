import React from 'react';
import { classNames } from '../../utils/helpers';
import Image from 'next/image';

const MessageBubble = ({ isMe, message, picture }) => {
  console.log(picture);
  return (
    <li className={classNames('flex', isMe ? 'justify-end' : 'justify-start')}>
      {isMe ? (
        <>
          <div
            className={classNames(
              'relative max-w-xl px-4 py-2 text-gray-700 rounded shadow mr-2',
              isMe && 'bg-gray-100',
            )}>
            <span className='block'>{message}</span>
          </div>
          <Image src={picture} alt={picture} width={40} height={40} className='object-cover rounded-full' />
        </>
      ) : (
        <>
          <Image
            src={
              picture ||
              'https://s.gravatar.com/avatar/23db2683ca53913dd68d059748b31a…?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png'
            }
            alt={picture}
            width={40}
            height={40}
            className='object-cover rounded-full'
          />
          <div
            className={classNames(
              'relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ml-2',
              isMe && 'bg-gray-100',
            )}>
            <span className='block'>{message}</span>
          </div>
        </>
      )}
    </li>
  );
};

export default MessageBubble;

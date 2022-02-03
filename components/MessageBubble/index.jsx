import React from 'react';
import { classNames } from '../../utils/helpers';
import Image from 'next/image';

const MessageBubble = ({ isMe, message, picture }) => {
  console.log(picture);
  return (
    <li className={classNames('flex', isMe ? 'justify-end' : 'justify-start')}>
      {isMe ? (
        <div className='flex items-start'>
          <div
            className={classNames(
              'relative max-w-xl px-4 py-2 text-gray-700 rounded-full shadow mr-2',
              isMe && 'bg-gray-100',
            )}>
            <span className='block text-ellipsis overflow-hidden'>{message}</span>
          </div>
          <Image
            src={picture}
            alt={picture}
            width={40}
            height={40}
            className='object-cover rounded-full aspect-square w-10'
          />
        </div>
      ) : (
        <div className='flex items-start'>
          <Image
            src={picture}
            alt={picture}
            width={40}
            height={40}
            className='object-cover rounded-full aspect-square w-10'
          />
          <div
            className={classNames(
              'relative max-w-xl px-4 py-2 text-gray-700 rounded-full shadow ml-2',
              isMe && 'bg-gray-100',
            )}>
            <span className='block text-ellipsis overflow-hidden'>{message}</span>
          </div>
        </div>
      )}
    </li>
  );
};

export default MessageBubble;

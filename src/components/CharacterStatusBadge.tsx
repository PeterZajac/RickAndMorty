import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdQuestionMark } from 'react-icons/md';
import { EStatus } from '../types/ICharacter';

interface CharacterStatusBadgeProps {
  status: EStatus | 'Unknown';
}

const CharacterStatusBadge: React.FC<CharacterStatusBadgeProps> = ({
  status,
}) => {
  let backgroundColor;
  let IconComponent;
  let textColor;

  switch (status) {
    case 'Alive':
      backgroundColor = '#67EF7B';
      IconComponent = FaCheck;
      textColor = 'rgba(0, 0, 0, 0.8)';
      break;
    case 'Dead':
      backgroundColor = '#FB6F6D';
      IconComponent = IoMdClose;
      textColor = 'rgba(0, 0, 0, 0.8)';
      break;
    case 'Unknown':
    default:
      backgroundColor = '#424345';
      IconComponent = MdQuestionMark;
      textColor = '#BCBDBD';
      break;
  }

  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        display: 'flex',
        justifyContent: 'center',
        width: 'fit-content',
        height: '1.4rem',
        alignItems: 'center',
        padding: '0 0.5rem ',
        paddingRight: '0.601rem',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 400,
      }}
    >
      <IconComponent style={{ marginRight: '0.25rem' }} />
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  );
};

export default CharacterStatusBadge;

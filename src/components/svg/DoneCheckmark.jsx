import React from 'react';
import doneIcon from '../../assets/done-icon.svg';

export default function DoneCheckmark({
  alt,
  width = undefined,
  height = undefined
}) {
  return <img src={doneIcon} width={width} height={height} alt={alt} />;
}

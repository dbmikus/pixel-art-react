import React from 'react';
import twitterSvg from '../../assets/twitter-social-icon-blue-circle.svg';

export default function TwitterLogo({
  alt,
  width = undefined,
  height = undefined
}) {
  return <img src={twitterSvg} width={width} height={height} alt={alt} />;
}

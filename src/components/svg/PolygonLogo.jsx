import React from 'react';
import polygonLogo from '../../assets/polygon-matic-logo.svg';

export default function PolygonLogo({
  alt,
  width = undefined,
  height = undefined
}) {
  return <img src={polygonLogo} width={width} height={height} alt={alt} />;
}

import * as React from 'react';
import IIconProps from './IIconProps';

export const PolygonIcon = (props: React.SVGAttributes<any>) => {
  return (
    <svg
      {...props}
      height="15px"
      width="15px"
      x="0px"
      y="0px"
      viewBox="0 0 226.3 200"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#4D4B4D">
        <path d="M226.3,200L0,153.1L56.8,1.8L207.1,0L226.3,200z M42.6,129.6l148.1,30.7L178.4,32l-99.6,1.2L42.6,129.6z" />
      </g>
    </svg>
  );
};

import * as React from 'react';
import IIconProps from './IIconProps';

export const CircleIcon = (props: React.SVGAttributes<any>) => {
  return (
    <svg
      {...props}
      x="0px"
      y="0px"
      viewBox="0 0 200 200"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#4D4B4D">
        <path d="M100,0C44.9,0,0,44.9,0,100s44.9,100,100,100s100-44.9,100-100S155.1,0,100,0z M100,168.5c-37.8,0-68.5-30.7-68.5-68.5c0-37.8,30.7-68.5,68.5-68.5c37.8,0,68.5,30.7,68.5,68.5C168.5,137.8,137.8,168.5,100,168.5z" />
      </g>
    </svg>
  );
};

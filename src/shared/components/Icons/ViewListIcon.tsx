import * as React from 'react';
import IIconProps from './IIconProps';

export const ViewListIcon = (props: IIconProps) => {
  return (
    <svg
      fill="#000000"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

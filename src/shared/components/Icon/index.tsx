import * as React from 'react';
import * as classnames from 'classnames';

export interface IconProps {
  icon: string;
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
}

export const Icon = ({ icon, className = '', onClick }: IconProps) => {
  return <i onClick={onClick} className={classnames('icon', className, icon)} />;
};

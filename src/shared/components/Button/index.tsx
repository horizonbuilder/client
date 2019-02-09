import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Icon } from '../Icon';

type ButtonTypes = 'primary' | 'secondary' | 'default' | 'light' | 'danger';
type ButtonSizes = 'medium' | 'small' | 'tiny';

export interface ButtonProps {
  children?: any;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  type?: ButtonTypes;
  size?: ButtonSizes;
  fluid?: boolean;
  disabled?: boolean;
  form?: string;
  formControl?: boolean;
  buttonType?: string;
  className?: string;
  iconLeft?: string;
  iconRight?: string;
  icon?: string;
}

const buttonClassname = (
  buttonType: ButtonTypes,
  buttonSize: ButtonSizes,
  fluid,
  formControl,
  iconConfig,
  className?: string
): string =>
  classnames(
    'button-component',
    styles.Button,
    className,
    {
      [styles.ButtonDefault]: buttonType === 'default',
      [styles.ButtonPrimary]: buttonType === 'primary',
      [styles.ButtonSecondary]: buttonType === 'secondary',
      [styles.ButtonLight]: buttonType === 'light',
      [styles.ButtonDanger]: buttonType === 'danger'
    },
    {
      [styles.medium]: buttonSize === 'medium',
      [styles.small]: buttonSize === 'small',
      [styles.tiny]: buttonSize === 'tiny'
    },
    {
      [styles.fluid]: fluid
    },
    {
      [styles.formControl]: formControl
    },
    {
      [styles.iconLeft]: iconConfig.iconLeft,
      [styles.iconRight]: iconConfig.iconRight,
      [styles.iconButton]: iconConfig.icon
    }
  );

export const Button = ({
  buttonType = 'button',
  type = 'default',
  size = 'medium',
  fluid = false,
  formControl = false,
  form,
  children,
  disabled,
  onClick,
  className,
  iconLeft,
  iconRight,
  icon
}: ButtonProps) => {
  let isIconButton = !React.Children.count(children) && icon && !iconLeft && !iconRight;

  return (
    <button
      type={buttonType}
      form={form}
      className={buttonClassname(
        type,
        size,
        fluid,
        formControl,
        { icon, iconLeft, iconRight },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isIconButton ? (
        <React.Fragment>
          <Icon icon={icon} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {iconLeft && <Icon icon={iconLeft} />}
          {children}
          {iconRight && <Icon icon={iconRight} />}
        </React.Fragment>
      )}
    </button>
  );
};

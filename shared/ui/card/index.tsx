import { clsx } from 'clsx';

import styles from './Card.module.scss';
import {forwardRefWithAs} from "@/shared/lib/types/props-with-as-attributes";

type CardProps = {
  className?: string;
  size?: 'small' | 'medium';
  color?: 'primary';
};

export const Card = forwardRefWithAs<CardProps>((props, ref) => {
  const {
    children,
    className,
    as = 'div',
    size = 'medium',
    color = 'primary',
    ...otherProps
  } = props;

  const Tag = as as string;

  return (
    <Tag
      ref={ref}
      className={clsx(className, styles[size], styles[color])}
      {...otherProps}
    >
      {children}
    </Tag>
  );
});

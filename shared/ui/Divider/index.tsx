import clsx from 'clsx';

import styles from './Divider.module.scss';

type DividerProps = {
  direction?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  length?: string | number;
  className?: string;
  marginY?: string | number;
};

export const Divider = ({
  direction = 'horizontal',
  color = '#e5e7eb',
  thickness = 1,
  length = '100%',
  className,
  marginY,
}: DividerProps) => {
  return (
    <div
      className={clsx(
        styles.divider,
        direction === 'vertical' ? styles.vertical : styles.horizontal,
        className,
      )}
      style={{
        backgroundColor: color,
        ...(direction === 'horizontal'
          ? { height: thickness, width: length }
          : { width: thickness, height: length }),
        ...(marginY !== undefined
          ? { marginTop: marginY, marginBottom: marginY }
          : {}),
      }}
    />
  );
};

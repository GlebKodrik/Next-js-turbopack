import clsx from 'clsx';

import styles from './ProgressBar.module.scss';

type ProgressBarProps = {
  value: number;
  max?: number;
  color?: string;
  className?: string;
};

export const ProgressBar = ({
  value,
  max = 100,
  color,
  className,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max(value / max, 0), 1) * 100;

  return (
    <div className={clsx(styles.container, className)}>
      <div
        className={styles.bar}
        style={{
          width: `${percentage}%`,
          backgroundColor: color || '#A73AFD',
        }}
      />
    </div>
  );
};

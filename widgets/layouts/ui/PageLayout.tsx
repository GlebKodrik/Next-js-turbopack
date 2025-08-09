import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './PageLayout.module.scss';

type BasePageLayoutProps = {
  theme?: 'dark' | 'light';
  children: ReactNode;
  classes?: {
    content?: string;
    footer?: string;
  };
  resetPadding?: {
    content?: {
      allWithoutDesktop: boolean;
    };
    all?: boolean;
  };
};

export const PageLayout = ({
  children,
  classes = {},
  theme = 'dark',
  resetPadding,
}: BasePageLayoutProps) => {
  const isResetAll = resetPadding?.all;
  const getIsReset = () => {
    if (resetPadding) {
      return !!resetPadding?.content?.allWithoutDesktop;
    }
    return false;
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(
          classes?.content,
          styles.content,
          styles[`content_${theme}`],
        )}
      >
        <main
          className={clsx({
            'main-wrapper': !getIsReset() && !isResetAll,
            [styles.allWithoutDesktop]: getIsReset(),
            [styles.resetAll]: isResetAll,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

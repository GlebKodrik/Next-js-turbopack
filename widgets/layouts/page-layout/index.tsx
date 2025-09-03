import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';

import { BreadcrumbItem, Breadcrumbs } from '@/shared/ui/breadcrumbs';

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
  breadcrumbs?: ReactElement | Array<BreadcrumbItem>;
};

export const PageLayout = ({
  children,
  classes = {},
  theme = 'dark',
  resetPadding,
  breadcrumbs,
}: BasePageLayoutProps) => {
  const isResetAll = resetPadding?.all;

  const getIsReset = () => {
    if (resetPadding) {
      return !!resetPadding?.content?.allWithoutDesktop;
    }
    return false;
  };

  const renderBreadcrumbs = () => {
    if (!breadcrumbs) return null;

    if ((breadcrumbs as ReactElement)?.type) {
      return breadcrumbs as ReactElement;
    }

    return <Breadcrumbs items={breadcrumbs as Array<BreadcrumbItem>} />;
  };

  return (
    <div className="content flex flex-col">
      <div
        className={clsx(
          classes?.content,
          styles.content,
          styles[`content_${theme}`],
        )}
      >
        <div className={clsx('main-wrapper')}>{renderBreadcrumbs()}</div>
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

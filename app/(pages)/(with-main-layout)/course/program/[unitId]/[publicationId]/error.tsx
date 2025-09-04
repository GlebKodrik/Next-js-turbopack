'use client';

import { PageLayout } from '@/widgets/layouts';

import styles from './page.module.scss';

export default function Error() {
  return (
    <PageLayout theme="light">
      <div
        className={styles.payload}
        title="Произошла ошибка"
      />
    </PageLayout>
  );
}

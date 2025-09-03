'use client';


import { Metadata } from 'next';


import { PageLayout } from '@/widgets/layouts';

import styles from './Error.module.scss';

export const metadata: Metadata = {
  title: 'произошла ошибка',
};

export default function ErrorComponent() {

  return (
    <>
      <PageLayout
        classes={{ content: styles.wrapper }}
        theme="light"
      >
        ASDASD
      </PageLayout>
    </>
  );
}

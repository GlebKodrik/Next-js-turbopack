import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { PageLayout } from '@/widgets/layouts';

import styles from './NotFound.module.scss';


export default function NotFound() {
  return (
    <>
      <Header />
      <PageLayout
        theme="light"
        classes={{ content: styles.wrapper }}
      >
        Test
      </PageLayout>
      <Footer />
    </>
  );
}

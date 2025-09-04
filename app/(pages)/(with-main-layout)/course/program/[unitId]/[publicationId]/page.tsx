import { Metadata } from 'next';

import { PageLayout } from '@/widgets/layouts';


// true (default): Dynamic segments not included in generateStaticParams are generated on demand.
export const dynamicParams = true;
// number: (in seconds) Set the default revalidation frequency of a layout or page to n seconds.
export const revalidate = 3600;

export async function generateStaticParams() {
  return []
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Курсы',
  };
};

export default async function CourseProgram() {

  return (
    <PageLayout theme="light">
      435345
    </PageLayout>
  );
}

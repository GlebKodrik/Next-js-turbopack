import {
  IntensivesContainer,
} from '@/widgets/intensives';
import { PageLayout } from '@/widgets/layouts';



export default async function Intensives() {

  return (
    <PageLayout
      theme="light"
      resetPadding={{ content: { allWithoutDesktop: true } }}
    >
      <IntensivesContainer />
    </PageLayout>
  );
}

import { Card } from '@/shared/ui/card';
import { Button, Heading } from '@/shared/ui/redesign';

import styles from './ChannelBanner.module.scss';

interface ChannelBannerProps {
  telegramBlock: any;
}

export const ChannelBanner = ({
  telegramBlock = { title: '', description: '' },
}: ChannelBannerProps) => {

  return (
    <Card
      size="small"
      className={styles.bannerCard}
    >
      <div >
        <Heading
          variant="h3"
          as="h4"
          className={styles.bannerTitle}
        >
          {telegramBlock.title}
        </Heading>
        <p
          dangerouslySetInnerHTML={{ __html: telegramBlock.description }}
        />
      </div>
      <Button
        onClick={() => {}}
        theme="purple"
        className={styles.button}
        size="s"
      >
        Участвовать в интенсиве
      </Button>
    </Card>
  );
};

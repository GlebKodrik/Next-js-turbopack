import ResponseEmpty from '../../assets/responses/empty.png';
import { createResponses } from '../responses';

export const ResponsesEmptyBox = createResponses({
  image: ResponseEmpty,
  description: 'Здесь пока ничего нет',
  imageClassName: 'sm:h-[280px] sm:w-[290px] h-[212px] w-[228px]',
});

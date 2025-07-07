import { BASE_URL } from '@/constants/routes';

export const Loading = () => (
  <div>
    <svg className="h-[30px] w-[30px] object-cover m-[40px_auto_0] spin-endless stroke-main-text duration-500 ">
      <use href={`${BASE_URL}/icons/sprite.svg#loader-icon`}></use>
    </svg>
  </div>
);

export default Loading;

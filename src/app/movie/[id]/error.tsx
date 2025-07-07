'use client';

import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export const Loading = () => (
  <div className="flex flex-col items-center mt-[40px]  gap-[30px] ">
    <h4 className="text-[30px]">Movie Not Found or Some Error Occurred</h4>

    <div className="flex gap-[20px] items-center ">
      <p className="text-[20px] ">Please go back</p>

      <Link
        href={ROUTES.HOME}
        className="text-white cursor-pointer hover:opacity-50 duration-300 text-[20px] font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px]"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default Loading;

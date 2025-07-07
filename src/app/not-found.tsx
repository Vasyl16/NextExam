import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-[40px]  gap-[30px] ">
      <h4 className="text-[30px]">Page Not Found</h4>

      <div className="flex gap-[20px] items-center ">
        <p className="text-[20px] ">Please go back</p>

        <Link
          href={ROUTES.HOME}
          className="text-white cursor-pointer hover:opacity-50 duration-300 text-[20px] font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px]"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

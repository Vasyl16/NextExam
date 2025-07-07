'use client';

import React from 'react';
import ContentLoader from 'react-content-loader';

type SkeletonCompType = {
  width: string;
  height: string;
  rounded: string;
};

export const SkeletonComp: React.FC<SkeletonCompType> = ({
  width,
  height,
  rounded,
}) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      backgroundColor="#dbdbdb"
      foregroundColor="#ecebeb"
    >
      <rect rx={rounded} ry={rounded} x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
  );
};

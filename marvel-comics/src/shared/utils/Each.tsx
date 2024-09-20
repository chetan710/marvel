import React, { ReactNode } from 'react';

interface EachProps<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}

export const Each = <T,>({ render, of }: EachProps<T>) => (
  <>
    {of.map((item: T, index: number) => (
      <React.Fragment key={index}>{render(item, index)}</React.Fragment>
    ))}
  </>
);

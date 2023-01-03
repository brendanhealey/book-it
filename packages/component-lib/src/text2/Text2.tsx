import React from 'react';

export interface Text2Props {
  children: React.ReactNode;
}

export const Text2 = ({ children }: Text2Props) => <h5>{children}</h5>;

export default Text2;

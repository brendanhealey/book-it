import React from 'react';

export interface Text2Props {
  children: React.ReactNode;
}

export const Text2 = ({ children }: Text2Props) => <h1>{children}</h1>;

export default Text2;

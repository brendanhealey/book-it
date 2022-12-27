import React from 'react';

export interface TextProps {
  children: React.ReactNode;
}

export const Text = ({ children }: TextProps) => <h1>{children}</h1>;

import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useInterval } from './useInterval';

interface Props {
  callback: () => void;
}

const ComponentToTest = ({ callback }: Props) => {
  useInterval(() => {
    callback();
  }, 1000);
  return <></>;
};

it('checks that the callback is called the correct number of times', async () => {
  jest.useFakeTimers();
  const tick = jest.fn();
  render(<ComponentToTest callback={tick} />);

  act(() => {
    jest.advanceTimersByTime(60000);
  });

  expect(tick).toHaveBeenCalledTimes(60);
});

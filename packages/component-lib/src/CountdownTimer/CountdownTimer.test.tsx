import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import { act } from 'react-dom/test-utils';
import * as stories from './CountdownTimer.stories';
import CountdownTimer from './CountdownTimer';

const { FiveSeconds, OneMinute, OverAnHour } = composeStories(stories);

test(`renders the FiveSeconds story`, async () => {
  jest.useFakeTimers();
  const { getByText } = render(<FiveSeconds />);
  getByText(/00:00:05/i);
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  getByText(/00:00:03/i);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  getByText(/00:00:00/i);
});

test(`renders the OneMinute story`, () => {
  const { getByText } = render(<OneMinute />);
  getByText(/00:01:00/i);
});

test(`renders the OverAnHour story`, () => {
  const { getByText } = render(<OverAnHour />);
  getByText(/01:10:30/i);
});

test(`invokes the callback upon expiry`, async () => {
  const cb = jest.fn();
  jest.useFakeTimers(); // call before render()
  const { getByText } = render(<CountdownTimer interval={{ seconds: 5 }} callback={cb} />);

  act(() => {
    jest.advanceTimersByTime(6000);
  });

  getByText(/00:00:00/i);

  await waitFor(() => {
    expect(cb).toHaveBeenCalled();
  });
});

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Typography from '@mui/joy/Typography';
import CountdownTimer from './CountdownTimer';

export default {
  title: 'CountdownTimer',
  component: CountdownTimer,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CountdownTimer>;

const Template: ComponentStory<typeof CountdownTimer> = args => <CountdownTimer {...args} />;

export const FiveSeconds = Template.bind({});
FiveSeconds.args = {
  interval: { seconds: 5 },
};

export const OneMinute = Template.bind({});
OneMinute.args = {
  interval: { minutes: 1 },
};

export const OverAnHour = Template.bind({});
OverAnHour.args = {
  interval: { hours: 1, minutes: 10, seconds: 30 },
};

export const ExpiryCallback = Template.bind({});
ExpiryCallback.args = {
  interval: { seconds: 5 },
  callback: () => alert('the timer has exired'),
};

const SameLineTemplate: ComponentStory<typeof CountdownTimer> = args => (
  <>
    <Typography display="inline" component="span">
      The counter should be on the same line as this text &nbsp;
    </Typography>
    <CountdownTimer interval={{ minutes: 4, seconds: 30 }} />
  </>
);

export const TextOnSameLine = SameLineTemplate.bind({});

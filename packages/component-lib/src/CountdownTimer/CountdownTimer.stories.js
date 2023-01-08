import React from 'react'
import { Text } from '../core/Text'
import CountdownTimer from './CountdownTimer'

export default {
  title: 'CountdownTimer',
  component: CountdownTimer,
  parameters: {
    componentSubtitle: 'This component displays a countdown timer.',
    notes: {
      roadmap: `
            ##Future Functional Considerations

            Incrementally adapt to usage patterns as required.
            `,
      Implementation: 'CountdownTimer.tsx',
    },
    controls: {
      disabled: true,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
}

// CONTROL OPTIONS
// const OPTIONS_LABEL = ['5 second countdown', '1 minute countdown', '1h 10m 30s countdown']

export const FiveSeconds = () => <CountdownTimer interval={{ seconds: 5 }} />
export const OneMinute = () => <CountdownTimer interval={{ minutes: 1 }} />
export const OverAnHour = () => <CountdownTimer interval={{ hours: 1, minutes: 10, seconds: 30 }} />
export const ExpiryCallback = () => <CountdownTimer interval={{ seconds: 5 }} callback={() => alert('the timer has exired')} />
export const TextOnSameLine = () => (
  <>
    <Text component="span" color="error.main">
      OTP expires in &nbsp;
    </Text>
    <CountdownTimer interval={{ minutes: 4, seconds: 30 }} />
  </>
)

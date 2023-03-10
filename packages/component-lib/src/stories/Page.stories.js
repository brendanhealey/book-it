import { jsx as _jsx } from "react/jsx-runtime";
import { within, userEvent } from '@storybook/testing-library';
import { Page } from './Page';
export default {
    title: 'Example/Page',
    component: Page,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
};
const Template = (args) => _jsx(Page, { ...args });
export const LoggedOut = Template.bind({});
export const LoggedIn = Template.bind({});
// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
LoggedIn.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
};
//# sourceMappingURL=Page.stories.js.map
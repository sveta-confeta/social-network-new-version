import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddTextareaMessage} from "./AddTextareaMessage";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddTextareaMessage Component',
    component: AddTextareaMessage,

    argTypes: {

        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddTextareaMessage>;


const Template: ComponentStory<typeof AddTextareaMessage> = (args) => <AddTextareaMessage {...args} />;

export const AddTextareaMessageStories = Template.bind({});

AddTextareaMessageStories.args = {
  callback:action('Add messages')
};


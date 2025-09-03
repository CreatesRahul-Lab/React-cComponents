import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'Helper text',
    disabled: false,
    invalid: false,
    variant: 'outlined',
    size: 'md',
    type: 'text',
    showClearButton: true,
    showPasswordToggle: true,
    loading: false,
    darkMode: false,
    value: '',
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args: React.ComponentProps<typeof InputField>) => {
    const [val, setVal] = useState('');
    return (
      <div className={args.darkMode ? 'bg-gray-900 p-6 min-h-[200px]' : 'bg-white p-6 min-h-[200px]'}>
        <div className="max-w-md">
          <InputField
            {...args}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: (args: React.ComponentProps<typeof InputField>) => {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    return (
      <div className={args.darkMode ? 'bg-gray-900 p-6 space-y-4' : 'bg-white p-6 space-y-4'}>
        <InputField {...args} label="Outlined" variant="outlined" value={v1} onChange={(e) => setV1(e.target.value)} />
        <InputField {...args} label="Filled" variant="filled" value={v2} onChange={(e) => setV2(e.target.value)} />
        <InputField {...args} label="Ghost" variant="ghost" value={v3} onChange={(e) => setV3(e.target.value)} />
      </div>
    );
  },
};

export const States: Story = {
  args: {
    helperText: undefined,
    errorMessage: undefined,
  },
  render: (args: React.ComponentProps<typeof InputField>) => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');
    return (
      <div className={args.darkMode ? 'bg-gray-900 p-6 grid gap-4' : 'bg-white p-6 grid gap-4'}>
        <InputField {...args} label="Normal" value={a} onChange={(e) => setA(e.target.value)} />
        <InputField {...args} label="Invalid" invalid errorMessage="This field is required" value={b} onChange={(e) => setB(e.target.value)} />
        <InputField {...args} label="Disabled" disabled value={c} onChange={(e) => setC(e.target.value)} />
        <InputField {...args} label="Loading" loading value={d} onChange={(e) => setD(e.target.value)} />
      </div>
    );
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    showPasswordToggle: true,
    label: 'Password',
    placeholder: 'Enter password',
  },
  render: (args: React.ComponentProps<typeof InputField>) => {
    const [p, setP] = useState('');
    return (
      <div className={args.darkMode ? 'bg-gray-900 p-6' : 'bg-white p-6'}>
        <div className="max-w-md">
          <InputField {...args} value={p} onChange={(e) => setP(e.target.value)} />
        </div>
      </div>
    );
  },
};

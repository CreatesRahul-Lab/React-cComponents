import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DataTable, { type Column } from './DataTable';

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 34 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 23 },
  { id: 4, name: 'Diana', email: 'diana@example.com', age: 42 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  tags: ['autodocs'],
  argTypes: {
    onRowSelect: { action: 'rowSelected' },
  },
  args: {
    loading: false,
    selectable: true,
    darkMode: false,
    emptyMessage: 'No users found',
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Playground: Story = {
  args: {
    data,
    columns,
  },
  render: (args: React.ComponentProps<typeof DataTable<User>>) => (
    <div className={args.darkMode ? 'bg-gray-900 p-6' : 'bg-white p-6'}>
      <DataTable<User> {...args} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

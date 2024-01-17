import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import TodoList from '../components/TodoList';

// Mock axios module
jest.mock('axios');

describe('TodoList', () => {
  afterEach(() => {
    // Cleaning up the mess left behind the previous test
    jest.clearAllMocks();
  });

  it('fetches and displays tasks', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [{ id: '1', task: 'Test task', completed: false }] });

    const { getByText } = render(<TodoList />);

    await waitFor(() => getByText('Test task'));
    expect(getByText('Test task')).not.toBeNull();
  });

});

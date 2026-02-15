import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageProvider, useMessage } from './MessageContext';

// Helper component to test the hook
function MessageConsumer() {
  const { state, fetchMessage } = useMessage();
  return (
    <div>
      <span data-testid="isFetching">{String(state.isFetching)}</span>
      <span data-testid="data">{state.data ?? ''}</span>
      <span data-testid="error">{state.error ?? ''}</span>
      <button onClick={fetchMessage}>Fetch</button>
    </div>
  );
}

describe('MessageContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should provide initial state', () => {
    render(
      <MessageProvider>
        <MessageConsumer />
      </MessageProvider>
    );
    expect(screen.getByTestId('isFetching').textContent).toBe('false');
    expect(screen.getByTestId('data').textContent).toBe('');
    expect(screen.getByTestId('error').textContent).toBe('');
  });

  it('should fetch message successfully', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Hello world' }),
    } as Response);

    render(
      <MessageProvider>
        <MessageConsumer />
      </MessageProvider>
    );

    await user.click(screen.getByText('Fetch'));

    await waitFor(() => {
      expect(screen.getByTestId('data').textContent).toBe('Hello world');
    });
    expect(screen.getByTestId('isFetching').textContent).toBe('false');
  });

  it('should handle fetch error', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(
      <MessageProvider>
        <MessageConsumer />
      </MessageProvider>
    );

    await user.click(screen.getByText('Fetch'));

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe(
        'There was an error retrieving data, please try again'
      );
    });
  });

  it('should handle network error', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    render(
      <MessageProvider>
        <MessageConsumer />
      </MessageProvider>
    );

    await user.click(screen.getByText('Fetch'));

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe(
        'There was an error retrieving data, please try again'
      );
    });
  });

  it('should set isFetching to true while loading', async () => {
    const user = userEvent.setup();
    let resolvePromise!: (value: Response) => void;
    vi.spyOn(globalThis, 'fetch').mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    render(
      <MessageProvider>
        <MessageConsumer />
      </MessageProvider>
    );

    await user.click(screen.getByText('Fetch'));
    expect(screen.getByTestId('isFetching').textContent).toBe('true');

    await act(async () => {
      resolvePromise({
        ok: true,
        json: async () => ({ message: 'done' }),
      } as Response);
    });

    await waitFor(() => {
      expect(screen.getByTestId('isFetching').textContent).toBe('false');
    });
  });

  it('should throw when useMessage is used outside MessageProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<MessageConsumer />)).toThrow(
      'useMessage must be used within a MessageProvider'
    );

    consoleSpy.mockRestore();
  });
});

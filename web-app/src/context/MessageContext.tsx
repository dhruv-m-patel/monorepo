import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';

interface MessageState {
  isFetching: boolean;
  error?: string;
  data?: string;
}

type MessageAction =
  | { type: 'FETCH_PENDING' }
  | { type: 'FETCH_COMPLETED'; payload: string }
  | { type: 'FETCH_FAILED'; payload: string };

interface MessageContextValue {
  state: MessageState;
  fetchMessage: () => Promise<void>;
}

const initialState: MessageState = {
  isFetching: false,
  error: undefined,
  data: undefined,
};

function messageReducer(
  state: MessageState,
  action: MessageAction,
): MessageState {
  switch (action.type) {
    case 'FETCH_PENDING':
      return { ...state, isFetching: true, error: undefined };
    case 'FETCH_COMPLETED':
      return { ...state, isFetching: false, data: action.payload };
    case 'FETCH_FAILED':
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
}

const MessageContext = createContext<MessageContextValue | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const fetchMessage = useCallback(async () => {
    dispatch({ type: 'FETCH_PENDING' });
    try {
      const response = await fetch('/api/message');
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: 'FETCH_COMPLETED', payload: data.message });
    } catch {
      dispatch({
        type: 'FETCH_FAILED',
        payload: 'There was an error retrieving data, please try again',
      });
    }
  }, []);

  return (
    <MessageContext.Provider value={{ state, fetchMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage(): MessageContextValue {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}

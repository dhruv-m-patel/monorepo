import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageProvider } from './context/MessageContext';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <MessageProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MessageProvider>
    </BrowserRouter>
  );
}

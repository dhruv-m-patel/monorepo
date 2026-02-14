import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageProvider } from './context/MessageContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MessageProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </MessageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

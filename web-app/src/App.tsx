import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageProvider } from './context/MessageContext';
import {
  ThemeProvider,
  type ColorPalette,
} from '@dhruv-m-patel/react-components';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

/**
 * Orange primary + light-red destructive palette overrides.
 * These override the component library's default violet theme
 * to match web-app's index.css color tokens.
 */
const themeOverrides: Partial<ColorPalette> = {
  primary: 'oklch(0.65 0.2 45)',
  'primary-foreground': 'oklch(0.985 0 0)',
  destructive: 'oklch(0.62 0.2 18)',
  'destructive-foreground': 'oklch(0.985 0 0)',
  accent: 'oklch(0.94 0.04 50)',
  'accent-foreground': 'oklch(0.16 0.015 50)',
  ring: 'oklch(0.65 0.2 45)',
};

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" overrides={themeOverrides}>
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

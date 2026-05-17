import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

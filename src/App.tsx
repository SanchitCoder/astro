import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

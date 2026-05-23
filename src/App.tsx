import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="consultation" element={<ConsultationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

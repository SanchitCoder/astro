import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { WebinarPage } from './pages/WebinarPage';
import { MegaWebinarPage } from './pages/MegaWebinarPage';
import { MasterclassPage } from './pages/MasterclassPage';
import { MasterclassThankYouPage } from './pages/MasterclassThankYouPage';
import { ConsultationLandingPage } from './pages/ConsultationLandingPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Standalone landing pages — no site navbar/footer */}
        <Route path="mega-webinar"       element={<MegaWebinarPage />} />
        <Route path="masterclass"              element={<MasterclassPage />} />
        <Route path="masterclass/thank-you"    element={<MasterclassThankYouPage />} />
        <Route path="book-consultation"  element={<ConsultationLandingPage />} />

        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="webinar" element={<WebinarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

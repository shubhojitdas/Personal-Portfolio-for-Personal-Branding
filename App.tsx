import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Shared';
import { Home, ArticlesPage, BlogPost, AboutMe, Contact } from './pages/Public';
import { Login, Dashboard, Editor } from './pages/Admin';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Articles Routes */}
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<BlogPost />} />
            
            {/* About Me Route */}
            <Route path="/about" element={<AboutMe />} />
            
            {/* Contact Route */}
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/new" element={<Editor />} />
            <Route path="/admin/edit/:id" element={<Editor />} />

            {/* Legacy/Redirects */}
            <Route path="/blog" element={<Navigate to="/articles" replace />} />
            <Route path="/research" element={<Navigate to="/about" replace />} />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
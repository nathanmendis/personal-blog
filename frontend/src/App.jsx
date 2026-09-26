import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import ProjectsPage from './pages/ProjectsPage';
import FreelanceDashboard from './pages/FreelanceDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/freelance" element={<FreelanceDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<CharacterDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

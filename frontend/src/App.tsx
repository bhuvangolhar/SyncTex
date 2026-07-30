import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
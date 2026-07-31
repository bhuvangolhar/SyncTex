import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './pages/Login';
import { SignUp } from './pages/Register';
import { Welcome } from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/create" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages';

function App() {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

export default App;

import { Link, Routes, Route } from 'react-router-dom';
import { Home, Create, Update } from './pages';

function App() {
  return (
    <>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;

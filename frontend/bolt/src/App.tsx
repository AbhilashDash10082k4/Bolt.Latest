import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom"
import './App.css'

import Home from './pages/Home';
import Builder from "./pages/Builder";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/builder" element={<Builder/>} />
      </Routes>
    </Router>
  )
}

export default App

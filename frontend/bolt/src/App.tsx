import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom"
import './App.css'

import Home from './pages/Home';
import Builder from "./pages/Builder";
import { FormProvider } from "./context/FormProvider";
function App() {
  return (
    <FormProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/builder" element={<Builder/>} />
      </Routes>
    </Router>
    </FormProvider>
  )
}

export default App

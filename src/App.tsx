import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChordPractice from "./pages/ChordPractice";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<ChordPractice/>} />
      </Routes>
    </Router>
  )
}

export default App;

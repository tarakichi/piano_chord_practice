import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMenu from "./pages/HomeMenu";
import ChordViewer from "./pages/ChordViewer";
import ChordPractice from "./pages/ChordPractice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeMenu/>} />
        <Route path="/viewer" element={<ChordViewer/>} />
        <Route path="/practice" element={<ChordPractice/>} />
      </Routes>
    </Router>
  )
}

export default App;

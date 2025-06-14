import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMenu from "./pages/HomeMenu";
import CodeViewer from "./pages/CodeViewer";
import CodePractice from "./pages/CodePractice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeMenu/>} />
        <Route path="/viewer" element={<CodeViewer/>} />
        <Route path="/practice" element={<CodePractice/>} />
      </Routes>
    </Router>
  )
}

export default App;

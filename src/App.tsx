import ExtraCalcs from "./components/ExtraCalculators/ExtraCalcs";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="flex items-center justify-center">
      <Routes>
        <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
      </Routes>
    </main>
  );
}

export default App;

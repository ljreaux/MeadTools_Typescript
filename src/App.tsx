import { useState } from "react";
import ExtraCalcs from "./components/ExtraCalculators/ExtraCalcs";
import Navbar from "./components/Navs/Navbar";
import { Route, Routes } from "react-router-dom";
import BottomBar from "./components/Navs/BottomBar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [opened, setOpened] = useState({
    menu: false,
    calcs: false,
    extraCalcs: false,
    account: false,
    links: false,
  });
  return (
    <div className="grid">
      <Navbar
        token={token}
        setToken={setToken}
        opened={opened}
        setOpened={setOpened}
      />
      <main
        className="flex items-center justify-center w-full min-h-[100vh]"
        onClick={() => setOpened((prev) => ({ ...prev, menu: false }))}
      >
        <Routes>
          <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
        </Routes>
        <BottomBar />
      </main>
    </div>
  );
}

export default App;

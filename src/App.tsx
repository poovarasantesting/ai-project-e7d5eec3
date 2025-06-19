import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import PreLoginChatPage from "@/pages/PreLoginChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLoginChatPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
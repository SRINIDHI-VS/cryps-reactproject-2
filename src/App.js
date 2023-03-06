import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Coins from './Components/Coins';
import CoinDetails from './Components/CoinDetails';
import Exchanges from './Components/Exchanges';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Coins" element={<Coins />} />
          <Route path="/Coin/:id" element={<CoinDetails />} />
          <Route path="/Exchanges" element={<Exchanges />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;

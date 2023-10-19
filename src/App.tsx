import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GiftListPage } from './pages/GiftListPage';
import { FirstGamePage } from './pages/FirstGamePage';
import { SecondGamePage } from './pages/SecondGamePage';
import { ThirdGamePage } from './pages/ThirdGamePage';
import { FourthGamePage } from './pages/FourthGamePage';

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" Component={FirstGamePage} />
        <Route path="/secondGame" Component={SecondGamePage} />
        <Route path="/thirdGame" Component={ThirdGamePage} />
        <Route path="/fourthGame" Component={FourthGamePage} />
        <Route path="/gift-list" Component={GiftListPage} />
      </Routes>
    </MemoryRouter>
  )
}

export default App

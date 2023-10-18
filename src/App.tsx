import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GiftListPage } from './pages/GiftListPage';
import { FirstGamePage } from './pages/FirstGamePage';
import { SecondGamePage } from './pages/SecondGamePage';
import { ThirdGamePage } from './pages/ThirdGamePage';

function App() {
  return (
    <MemoryRouter>
      <Routes>
        {/* <Route path="/" Component={FirstGamePage} /> */}
        <Route path="/" Component={ThirdGamePage} />
        <Route path="/secondGame" Component={SecondGamePage} />
        <Route path="/thirdGame" Component={ThirdGamePage} />
        <Route path="/gift-list" Component={GiftListPage} />
      </Routes>
    </MemoryRouter>
  )
}

export default App

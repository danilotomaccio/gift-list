import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { GiftListPage } from './pages/GiftListPage';
import { FirstGamePage } from './pages/FirstGamePage';
import { SecondGamePage } from './pages/SecondGamePage';
import { ThirdGamePage } from './pages/ThirdGamePage';
import { FourthGamePage } from './pages/FourthGamePage';
import { RecoilRoot, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { currentPageState } from './state/appState';

function App() {
  const [currentPath, setCurrentPath] = useRecoilState<string>(currentPageState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(currentPath);
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (

    <Routes>
      <Route path="/" Component={FirstGamePage} />
      <Route path="/secondGame" Component={SecondGamePage} />
      <Route path="/thirdGame" Component={ThirdGamePage} />
      <Route path="/fourthGame" Component={FourthGamePage} />
      <Route path="/gift-list" Component={GiftListPage} />
    </Routes>
  )
}

function RecoilWrappwer() {
  return (
    <RecoilRoot>
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    </RecoilRoot>
  )
}

export default RecoilWrappwer

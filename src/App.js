import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TicTacToe from './components/game';
import WinCheck from './components/winCheck/winCheck';

function App() {
  return (<>
   <BrowserRouter>

              <Routes>
              <Route path="/" element={  <TicTacToe/>} />
              <Route path='*' element={ <div>not found</div> } />
              <Route path="/win" element={  <WinCheck/>} />
              </Routes>
    </BrowserRouter>

  </>);
}
export default App;

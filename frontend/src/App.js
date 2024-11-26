
//라우터 설정
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main/page/Main'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Main/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;

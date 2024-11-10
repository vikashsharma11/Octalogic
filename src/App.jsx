import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Namepage from './components/namePage';
import Wheelstype from './components/wheelsType';
import Wheelsname from './components/wheelsName';
import Wheelsmodel from './components/wheelsModel';
import Dateandtime from './components/dateAndTme';
import Congrats from './components/congrats'



function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Namepage />} />
          <Route path='/wheelsType' element={<Wheelstype />} />
          <Route path='/wheelsName' element={<Wheelsname />} />
          <Route path='/wheelsModel' element={<Wheelsmodel />} />
          <Route path='/dateandTime' element={<Dateandtime />} />
          <Route path='/Confirmed' element={<Congrats />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

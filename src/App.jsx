import { useState,createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slider from './Components/slider'
import Dropdown from './Components/dropDown'
import { DateTime } from 'luxon'

export const UTCcontext=createContext();

function App() {
  //const [UTCglobal, setUTCglobal] = useState(DateTime.now().toUTC());
  const [UTCglobal, setUTCglobal] = useState(DateTime.utc());




  return (
    <>
    <UTCcontext.Provider value={[UTCglobal,setUTCglobal]}>

      <Slider zone="Asia/Kolkata"></Slider>
      <Slider zone="Europe/Paris"></Slider>

    </UTCcontext.Provider>

    </>
  )
}

export default App

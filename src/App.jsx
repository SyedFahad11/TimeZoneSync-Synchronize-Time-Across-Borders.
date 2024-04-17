import { useState,createContext } from 'react'

import './App.css'
import Slider from './Components/slider'
import Dropdown from './Components/dropDown'
import { DateTime } from 'luxon'
import { Reorder, useDragControls } from "framer-motion"


export const UTCcontext=createContext();

function App() {
  //const [UTCglobal, setUTCglobal] = useState(DateTime.now().toUTC());
  const [UTCglobal, setUTCglobal] = useState(DateTime.utc());
  const [items, setItems] = useState(["Asia/Kolkata"])
  const controls = useDragControls()



  return (
    <>
    <UTCcontext.Provider value={[UTCglobal,setUTCglobal]}>
      <Dropdown getter={items} setter={setItems}></Dropdown>

      <Reorder.Group values={items} onReorder={setItems}>
        {items.map(item => (
          <Slider key={item} zone={item}></Slider>

        ))}
      </Reorder.Group>

    </UTCcontext.Provider>

    </>
  )
}

export default App


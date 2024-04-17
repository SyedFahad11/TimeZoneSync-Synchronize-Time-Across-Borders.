import { useState,createContext } from 'react'

import './App.css'
import Slider from './Components/slider'
import Dropdown from './Components/dropDown'
import { DateTime } from 'luxon'
import { Reorder } from "framer-motion"

export const UTCcontext=createContext();

function App() {
  //const [UTCglobal, setUTCglobal] = useState(DateTime.now().toUTC());
  const [UTCglobal, setUTCglobal] = useState(DateTime.utc());
  const [items, setItems] = useState([0, 1, 2, 3])
  const zones=["Asia/Kolkata","Europe/Paris","Asia/Tokyo","Africa/Lagos"];



  return (
    <>
    <UTCcontext.Provider value={[UTCglobal,setUTCglobal]}>

    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          <Slider zone={zones[item]}></Slider>
        </Reorder.Item>
      ))}
    </Reorder.Group>

    </UTCcontext.Provider>

    </>
  )
}

export default App

/* import { useState } from "react"
import { Reorder } from "framer-motion"

function App() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
export default App */
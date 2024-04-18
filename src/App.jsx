import { useState,createContext,useEffect } from 'react'

import './App.css'
import Slider from './Components/slider'
import Dropdown from './Components/dropDown'
import { DateTime } from 'luxon'
import { Reorder, useDragControls } from "framer-motion"
import { MdDarkMode } from "react-icons/md";


export const UTCcontext=createContext();
export const StorageContext=createContext();

function App() {
  //const [UTCglobal, setUTCglobal] = useState(DateTime.now().toUTC());
  const [UTCglobal, setUTCglobal] = useState(DateTime.utc());
  const [items, setItems] = useState(["Asia/Kolkata","Australia/Melbourne"])
  const controls = useDragControls()

  const [theme,setTheme]=useState('light');

  useEffect(()=>{
    const userStoredZones=localStorage.getItem('userZones');
    if(userStoredZones!=null && userStoredZones.length>2){
      const arrayOfStrings = JSON.parse(userStoredZones);
      setItems(arrayOfStrings);
    }

  },[])

  const handleThemeChange=()=>{

    if(theme==='light')setTheme('dark');
    else setTheme('light');

  }

  useEffect(()=>{
    console.log(theme)
    document.querySelector('html').classList.remove('light','dark');
    document.querySelector('html').classList.add(theme);

  },[theme])




  return (
    <>

      <UTCcontext.Provider value={[UTCglobal,setUTCglobal]} >
        <div className="dark:bg-gray-950 pb-96 ">

          <div className='flex flex-row'>

              <div className='w-full ml-8'>

                <Dropdown getter={items} setter={setItems}></Dropdown>
                </div>


              <button onClick={handleThemeChange} class="dark:bg-stone-600 bg-sky-200 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-2xl mx-auto mt-4 border-2 border-slate-400 dark:border-white ">
                      <MdDarkMode />
              </button>


          </div>



        <Reorder.Group values={items} onReorder={setItems} >
          {items.map(item => (
            <Slider key={item} zone={item} getter={items} setter={setItems}></Slider>

          ))}
        </Reorder.Group>
        </div>

      </UTCcontext.Provider>

    </>
  )
}

export default App


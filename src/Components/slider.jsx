import React, { useState, useContext, useEffect } from 'react';
import { DateTime } from 'luxon'
import { UTCcontext } from '../App';
import { ReorderIcon } from './dragIcon'
import { Reorder, useDragControls } from 'framer-motion'
import { DeleteIcon } from './deleteIcon';

const Slider = (props) => {
  const [time, setTime] = useState(0);
  const [UTCglobal, setUTCglobal] = useContext(UTCcontext);


  const controls = useDragControls()

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  function initialLocalTime() {
    function convertUtcToZone(utcDateTime, targetZone) {
      const utcTime = new DateTime(utcDateTime, { zone: 'utc' });
      //const utcTime=utcDateTime;
      const targetTime = utcTime.setZone(targetZone);
      return targetTime;
    }
    function convertDateTimeToMins(dateTime) {
      const hours = dateTime.hour;
      const minutes = dateTime.minute;

      //console.log(`Hours: ${hours}, Minutes: ${minutes}`);

      const totalMinutes = hours * 60 + minutes;
      //console.log(totalMinutes);
      return totalMinutes;
    }
    const localTime = convertUtcToZone(UTCglobal, props.zone)
    const initialTime = convertDateTimeToMins(localTime);
    setTime(initialTime);

  }

  useEffect(() => initialLocalTime(), [UTCglobal])

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  const handleChange = (event) => {
    const currMins = parseInt(event.target.value)
    setTime(currMins);
    handleUTCglobal(currMins);
  };

  const handleUTCglobal = (currMins) => {
    function convertMinsToDateTime(minutes) {

      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      const dateTime = DateTime.now().setZone(props.zone);
      const newDateTime = dateTime.set({ hour: hours, minute: mins });

      return newDateTime;
    }
    function convertZoneToUTC(localDateTime) {
      const currentTime = new DateTime(localDateTime);
      const currentUTC = currentTime.toUTC();
      return currentUTC;
      // const currentTime = DateTime.now().setZone(props.zone);
      // const currentUTC = currentTime.toUTC();
      // return currentUTC;
    }

    const localDateTime = convertMinsToDateTime(currMins);
    const UTCdateTime = convertZoneToUTC(localDateTime)

    setUTCglobal(UTCdateTime);
  }


  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------


  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  const formatTimeWithoutPad = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const ampm = (hours < 12 || hours === 24) ? 'am' : 'pm';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}${ampm}`;
  };
  const renderScaleValues = () => {
    const scaleValues = [];
    console.log(window.innerWidth);

    if(window.innerWidth > 768){
      for (let i = 0; i <= 1440; i += 180) {
        scaleValues.push(formatTimeWithoutPad(i));
      }
    }
    else{
      for (let i = 0; i <= 1440; i += 360) {
        scaleValues.push(formatTimeWithoutPad(i));
      }

    }

    return scaleValues;
  }
  const formatDate = () => {
    const now = UTCglobal.setZone(props.zone);

    const year = now.year;
    const month = now.month;
    const day = now.day;

    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const dayOfWeek = now.toLocaleString({ weekday: 'long' });
    //return formattedDate;
    return { date, dayOfWeek };
  };

  const handleDelete= async (event)=>{
    const parentId = event.target.closest('div').id;
    const parentDiv = document.getElementById(parentId);
    if (parentDiv) {
      const newArray=props.getter.filter(item=>item!=parentId);

      await props.setter(newArray);
      const toStore=await JSON.stringify(newArray)
      await localStorage.setItem('userZones',toStore);
      parentDiv.remove();
    }
  }
  var dragButtonToggle=false;

  if(window.innerWidth<768){
    dragButtonToggle=true;
  }
  else{
    dragButtonToggle=false;
  }


  return (
    <Reorder.Item id={props.zone}
      value={props.zone}
      dragListener={dragButtonToggle}
      dragControls={controls} >

      <div id={props.zone} className="w-3/5 mx-auto mt-8 bg-sky-100 dark:bg-stone-600  p-4 flex flex-col md:flex-row justify-between items-center rounded-2xl  shadow-md border-2 border-slate-400 dark:border-white">
      <ReorderIcon dragControls={controls} />

        <div className="w-full  md:w-4/5 mx-auto bg-sky-100 dark:bg-stone-600  " >

          <div className="mx-auto bg-sky-100 dark:bg-stone-600   p-4 flex flex-col md:flex-row justify-between items-center ">
            <div className="h-12 md:w-1/4 p-2 bg-white dark:bg-stone-800 dark:text-white rounded-xl shadow-md text-center border-2 border-yellow-500">  {props.zone}
            </div>
            <div className="h-12 md:w-1/4 p-2 bg-white dark:bg-stone-800 dark:text-white rounded-xl shadow-md text-center border-2 border-emerald-500">  {formatTime(time)}
            </div>
            <div className="h-12 md:w-1/4 p-2 bg-white  dark:bg-stone-800 dark:text-white rounded-xl shadow-md text-center border-2 border-red-500">  {formatDate().date}
            </div>
            <div  className="h-12 md:w-1/4 p-2 bg-white  dark:bg-stone-800 dark:text-white rounded-xl shadow-md text-center border-2 border-cyan-700">  {formatDate().dayOfWeek}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={1439}
            step={1}
            value={time}
            onChange={handleChange}
            className="w-full "
          />
          <div className="flex justify-between">
            {renderScaleValues().map((value, index) => (
              <div className='dark:text-white' key={index}>{value}</div>
            ))}
          </div>
        </div>


        <button onClick={handleDelete}>
          <DeleteIcon></DeleteIcon>
        </button>


      </div>

    </Reorder.Item>
  );
};

export default Slider;

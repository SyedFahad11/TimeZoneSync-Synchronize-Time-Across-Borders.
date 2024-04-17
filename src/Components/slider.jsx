import React, { useState,useContext, useEffect } from 'react';
import { DateTime } from 'luxon'
import { UTCcontext } from '../App';

const Slider = (props) => {
  const [time, setTime] = useState(0);
  const [UTCglobal,setUTCglobal]=useContext(UTCcontext);


  const handleChange = (event) => {
    const currMins=parseInt(event.target.value)
    setTime(currMins);
    //setUTCglobal
    handleUTCglobal(currMins);
  };

  const handleUTCglobal=(currMins)=>{
    const localDateTime=convertMinsToDateTime(currMins);

    const UTCdateTime=convertZoneToUTC(localDateTime)

    setUTCglobal(UTCdateTime);
  }



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
    const ampm = (hours < 12 || hours===24) ? 'am' : 'pm';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}${ampm}`;
  };
  const renderScaleValues = () => {
    const scaleValues = [];
    for (let i = 0; i <= 1440; i += 180) {
      scaleValues.push(formatTimeWithoutPad(i));
    }
    return scaleValues;
  }

//----------------------------------------------------------------------------

  function convertZoneToUTC(localDateTime) {
    const currentTime = new DateTime(localDateTime);
    const currentUTC = currentTime.toUTC();
    return currentUTC;
    // const currentTime = DateTime.now().setZone(props.zone);
    // const currentUTC = currentTime.toUTC();
    // return currentUTC;
  }

  function convertUtcToZone(utcDateTime, targetZone) {
    const utcTime = new DateTime(utcDateTime, { zone: 'utc' });
    //const utcTime=utcDateTime;
    const targetTime = utcTime.setZone(targetZone);
    return targetTime;
  }

  function convertDateTimeToMins(dateTime){
    const hours = dateTime.hour;
    const minutes = dateTime.minute;

    console.log(`Hours: ${hours}, Minutes: ${minutes}`);

    const totalMinutes = hours * 60 + minutes;
    console.log(totalMinutes);
    return totalMinutes;
  }

  function convertMinsToDateTime(minutes) {

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    // Get the current local DateTime object
    const dateTime = DateTime.now().setZone(props.zone);

    // Set the hours and minutes components
    const newDateTime = dateTime.set({ hour: hours, minute: mins });

    return newDateTime;
  }






  function test(){
    /* const newTime=convertUtcToZone(UTCglobal,'Asia/Kolkata');
    console.log(UTCglobal.toISO());
    //setUTCglobal(newTime);
    console.log(newTime)
     */

  }

  useEffect(()=>{
    const localTime=convertUtcToZone(UTCglobal,props.zone)
    const initialTime=convertDateTimeToMins(localTime);
    setTime(initialTime)

  },[UTCglobal])


//----------------------------------------------------------------------------




  return (
    <div className="w-1/2 mx-auto mt-8 bg-sky-100 p-8">
      <div className="w-1/2 mx-auto bg-sky-100 p-4 flex justify-between items-center">
        <div id="1" className="h-12 w-24 p-2 bg-white">{props.zone}</div>
        <div id="2" className="h-12 w-24 p-2 bg-white">{formatTime(time)}</div>
      </div>
      <input
        type="range"
        min={0}
        max={1439} // 12 hours * 60 minutes
        step={1} // Step by 15 minutes
        value={time}
        onChange={handleChange}
        className="w-full"
      />
      <div className="flex justify-between ">
        {renderScaleValues().map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>


    </div>
  );
};

export default Slider;

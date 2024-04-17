import React, { useEffect, useState, useContext } from 'react';
import { StorageContext } from '../App';

const Dropdown = ({getter,setter}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);


  const tzs=window.timezones;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);

  };

  useEffect(()=>{
    setSearchData(tzs.filter((tz) =>tz.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,10));
  },[searchTerm])

  const handleSelection=async(e)=>{
    const timezone=e.currentTarget.id
    setSearchTerm('');
    const newArray=[...getter,timezone];
    await setter(newArray);
    await localStorage.setItem('userZones',JSON.stringify(newArray))
    /* var accString="";
    getter.forEach(item=>accString=accString+item+" ");
    console.log(accString); */

  }
  window.addEventListener('click', ()=>{
    setSearchTerm('')
  });



  return (
    <div>
      <div className='relative flex justify-center'>

        <input
          type="text"
          placeholder="Search for timezone..."
          value={searchTerm}
          onChange={handleInputChange}
          className="block appearance-none w-2/5 bg-white border-2 border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-between mx-auto mt-4"
        />
        <div className='absolute z-10 justify-center  bg-gray-100 w-2/5 mt-14'>
          {
            searchTerm &&
            searchData.map(item=>{
              return (



                  <div key={item} id={item} onClick={handleSelection} className='px-4'>
                    {item}
                    <hr/>

                    </div>
              )
            })
          }
        </div>
      </div>


    </div>
  );
};

export default Dropdown;


/* import React, { useState,useEffect } from 'react';

const Dropdown = ({getter,setter}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const tzs=window.timezones;


  const handleSearch = (event) => {
    const timezone=event.target.value;
    setSearchTerm(timezone);
  };

  const filteredOptions = tzs.filter((tz) =>
    tz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange=(event)=>{
    const timezone=event.target.value;
    setter([...getter,timezone]);
  }




  useEffect(() => {

  }, [selectedOption]);

  return (
    <div className="flex items-center">

      <input
        id="options"
        value={searchTerm}
        onChange={handleSearch}
        className="block appearance-none w-2/5 bg-white border-2 border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-between mx-auto mt-4"
      />

         <select
        id="options"
        value={selectedOption}
        onChange={handleSelectChange}
        className="block appearance-none w-2/5 bg-white border-2 border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-between mx-auto mt-4"
      >
        <option value="">AddTimeZone...</option>
        {filteredOptions.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>

    </div>



  );
};

export default Dropdown; */

{/* <div className="flex flex-col">
      <div className="bg-red-500 h-16">Item 1</div>
      <div className="bg-blue-500 h-16">Item 2</div>
      <div className="bg-green-500 h-16">Item 3</div>
</div>
 */}

/*  <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="block appearance-none w-2/5 bg-white border-2 border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-between mx-auto mt-4"
      >
        <option value="">AddTimeZone...</option>
        {filteredOptions.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select> */
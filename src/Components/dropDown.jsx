/* import React, { useState } from 'react';

const DropDown = ({ activities }) => {
  const [searchQuery, setSearchQuery] = useState('#');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const tzs=window.timezones;

  const filteredTzs = tzs.filter(tz => {
    const match = tz.toLowerCase().includes(searchQuery.toLowerCase());
    return match;

  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search Time Zone ..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-500 rounded-md px-3 py-2 mb-4"
      />
      {filteredTzs.map( tz=>(
        <p>`${tz}'</p>

      )
      )}
    </div>
  );
};
export default DropDown;
*/

import React, { useState } from 'react';

const Dropdown = ({getter,setter}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const timezone=event.target.value
    setSelectedOption(timezone);
    setter([...getter,timezone])
  };

  const tzs=window.timezones;

  return (
    <div className="flex items-center">

      <select
        id="options"
        value={selectedOption}
        onChange={handleChange}
        className="block appearance-none w-2/5 bg-white border-2 border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-between mx-auto mt-4"
      >
        <option value="">AddTimeZone...</option>
        {tzs.map(tz=>{
          return <option key={tz} value={tz}>{tz}</option>
        })}
      </select>
    </div>



  );
};

export default Dropdown;

{/* <div className="flex flex-col">
      <div className="bg-red-500 h-16">Item 1</div>
      <div className="bg-blue-500 h-16">Item 2</div>
      <div className="bg-green-500 h-16">Item 3</div>
</div>
 */}
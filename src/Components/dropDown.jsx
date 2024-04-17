import React, { useState } from 'react';

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

/* import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="options" className="mr-2">Select an option:</label>
      <select
        id="options"
        value={selectedOption}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default Dropdown;
 */


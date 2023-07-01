//react functional component

import React, { useState } from 'react';

export const DateQuery = ({
  description,
  validator,
  name,
  handleQueryValid
}) => {
  const [show, setShow] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });

  const handleDateChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDateRange = {...dateRange};
    newDateRange[name] = value;
    setDateRange(newDateRange);
  }

  const renderDividerButtonClass = () => {
    const valid: string = validator(dateRange.from, dateRange.to);
    if (valid){
      console.log('it all valie, sending back', name, valid)
      handleQueryValid(name, valid);
      return "btn btn-success";
    }
    handleQueryValid(name);
    return "btn";
  }

  return (
    <div className="mb-10">
      <div className="divider mb-8">
        <div className="tooltip" data-tip={description}>
          <button disabled={!validator(dateRange.from, dateRange.to)} onClick={() => setShow(!show)} className={renderDividerButtonClass()}>{name}</button>
        </div> 
      </div> 
      {show && <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <div className="flex justify-around"> 
              <label className="label">
                <span className="label-text">FROM:</span>
              </label>
              <input onChange={handleDateChange} value={dateRange.from} name="from" type="date" placeholder="start" className="basis-5/12 input input-bordered w-full" />
              <label className="label">
                <span className="label-text">TO:</span>
              </label>
              <input onChange={handleDateChange} value={dateRange.to} name="to" type="date" placeholder="end" className="basis-5/12 input input-bordered w-full" />
            </div> 
        </div>
      </div>}
    </div>
  )
}

export default DateQuery;
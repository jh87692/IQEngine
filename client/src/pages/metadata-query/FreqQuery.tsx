//react functional component

import React, { useState } from 'react';

export const FreqQuery = ({
  description,
  validator,
  name
}) => {
  const [show, setShow] = useState(true);
  const [freqRange, setFreqRange] = useState({
    from: 0,
    to: 0
  });

  const handleFreqChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newfreqRange = {...freqRange};
    newfreqRange[name] = value;
    setFreqRange(newfreqRange);
  }

  const renderDividerButtonClass = () => {
    if (validator(freqRange.from, freqRange.to)) {
      return "btn btn-success";
    }
    return "btn";
  }

  return (
    <div className="mb-10">
      <div className="divider mb-8">
        <div className="tooltip" data-tip={description}>
          <button disabled={!validator(freqRange.from, freqRange.to)} onClick={() => setShow(!show)} className={renderDividerButtonClass()}>{name}</button>
        </div> 
      </div> 
      {show && <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <h3 className="text-lg">
            From: 
            <span className="ml-2 badge badge-md badge-success">{freqRange.from} MHz</span>
          </h3>
          <input name="from" onChange={handleFreqChange} type="range" step={100} min={0} max="1000000" value={freqRange.from} className="range range-secondary w-full" />
          <h3 className="text-lg">
            To: 
            <span className="ml-2 badge badge-md badge-success">{freqRange.to} MHz</span>
          </h3>
          <input name="to" onChange={handleFreqChange} type="range" min={0} step={100} max="1000000" value={freqRange.to} className="range range-secondary w-full" />
        </div>
      </div>}
    </div>
  )
}

export default FreqQuery;
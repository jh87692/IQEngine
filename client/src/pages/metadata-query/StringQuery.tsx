//react functional component

import React, { useState } from 'react';

export const StringQuery = ({
  name,
  description,
  validator,
}) => {
  const [show, setShow] = useState(true);
  const [string, setString] = useState("");

  const handleStringChange = (e) => {
    const value = e.target.value;
    setString(value);
  }

  return (
    <div className="mb-10">
      <div className="divider mb-8">
        <div className="tooltip" data-tip={description}>
          <button
            onClick={() => setShow(!show)} 
            disabled={!validator(string)}
            className={string ? "btn btn-success" : "btn"}
          >
            {name}
          </button>
        </div> 
      </div> 
      {show && <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <input onChange={handleStringChange} value={string} type="text" placeholder={description} className="input input-bordered w-full" />
        </div> 
      </div>}
    </div>
  )
}

export default StringQuery;
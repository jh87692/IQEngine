// Copyright (c) 2022 Microsoft Corporation
// Copyright (c) 2023 Marc Lichtman
// Licensed under the MIT License
import React, { useContext, useEffect } from 'react';
import { getMeta } from '@/api/metadata/Queries';
import { SpectrogramContext } from './SpectrogramContext';

export default function InfoPane() {
  const spectrogramContext = useContext(SpectrogramContext);
  const { data } = getMeta(
    spectrogramContext.type,
    spectrogramContext.account,
    spectrogramContext.container,
    spectrogramContext.filePath
  );
  const meta = data;

  function titleCase(str: string) {
    str = str.replace('core:', '').replace(':', ' ').replace('_', ' ').replace('hw', 'Hardware');
    let strArr: string[] = str.toLowerCase().split(' ');
    for (var i = 0; i < strArr.length; i++) {
      strArr[i] = str.charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  const stringifyObject = (key: string, value: any) => {
    if(typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value
  }

  const handleChange = (e, key: string) => {
    
  }

  return (
    <div className="h-48 max-h-full overflow-y-scroll">
      {meta && meta?.global && (
        <div key={'InfoPane'}>
          {Object.entries(meta?.global).map(([key, value]) => (
            <div className="mb-3" key={key}>
              <div className="mb-3">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">{titleCase(key)}</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered input-success w-full max-w-xs"
                    defaultValue={stringifyObject(key, value)}
                    onChange={(event) => handleChange(event, key)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

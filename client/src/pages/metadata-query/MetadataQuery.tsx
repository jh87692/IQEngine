//react functional component
import React, { useState } from 'react';
import { queries} from './queries';

const MetadataQuery = () => {
  const [selections, setSelections] = useState(queries);

  const toggleSelected = (e) => {
    const name = e.target.name;
    const newSelections = {...selections};
    newSelections[name].selected = !newSelections[name].selected;
    setSelections(newSelections);
  }

  const renderQuerySelection = () => {
    return Object.keys(selections).map((item) => {
      return (
        <label key={item} className="cursor-pointer label">
          <span className="label-text">{item}</span>
          <input onChange={toggleSelected} type="checkbox" name={item} checked={selections[item].selected} className="checkbox checkbox-success" />
        </label>
      )
    });
  }

  const renderQueryComponents = () => {
    return Object.keys(selections).map((item) => {
      if (selections[item].selected) {
        const Component = selections[item].component;
        return (
          <Component 
            key={item} 
            name={item} 
            validator={selections[item].validator}
            description={selections[item].description}
            handleQueryValid={handleQueryValid}
            handleQueryInvalid={handleQueryInvalid}
          />
        )
      }
    });
  }

  const handleQueryValid = (name: string, value: string) => {
    const newSelections = {...selections};
    newSelections[name].queryString = value;
    setSelections(newSelections);
  }

  const handleQueryInvalid = (name: string) => {
    const newSelections = {...selections};
    newSelections[name].queryString = "";
    setSelections(newSelections);
  }

  const renderSearchButton = () => {
    return null
  }

  return (
    <div className="m-10 mt-100">
      <h1 className="text-3xl font-bold">Field Selection</h1>
      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-1">
          <div className="form-control">
            {renderQuerySelection()}
          </div>
        </div>
        <div className="col-span-9 ml-10 ">
          {renderQueryComponents()}
          {renderSearchButton()}
        </div>
      </div>
    </div>
    
  );
}

export default MetadataQuery;
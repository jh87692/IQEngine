//react functional component
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SigMFMetadata } from '@/utils/sigmfMetadata';
import Results from './Results';
import { queries} from './queries';



const MetadataQuery = () => {
  const [selections, setSelections] = useState(queries);
  const [data, setData] = useState<SigMFMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async (queryString) => {
    const response = await fetch(`http://127.0.0.1:5000/api/datasources/query?${queryString}`,
      { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' },
      });
    return await response.json();
  }

  // const {isLoading, fetchStatus, status, data, error, refetch} = useQuery(['metadata-query', queryString], fetchData, {
  //   enabled: false,
  // });

  const toggleSelected = (e) => {
    const name = e.target.name;
    const newSelections = {...selections};
    newSelections[name].selected = !newSelections[name].selected;
    newSelections[name].value = "";
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
            queryName={item} 
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
    newSelections[name].value = value;
    setSelections(newSelections);
  }

  const handleQueryInvalid = (name: string) => {
    const newSelections = {...selections};
    newSelections[name].value = "";
    setSelections(newSelections);
  }

  const showQueryButton = () => {
    let empty = true;
    for (let item of Object.keys(selections)) {
      if(selections[item].selected) {
        empty = false;
      }
      if (selections[item].selected && selections[item].value === ""){
        return false;
      }
    };
    if (empty)
      return false;
    return true;
  }

  const renderResults = () => {
    if(!data)
      return null;
    return <Results data={data} />
  }

  const handleQuery = async () => {
    let query = "";
    for (let item of Object.keys(selections)) {
      if(selections[item].value) {
        query += `${selections[item].value}&`
      }
    }
    if(!query)
      return;
    setIsLoading(true);
    const response = await fetchData(query);
    setData(response);
    setIsLoading(false);
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
          <button onClick={handleQuery} disabled={!showQueryButton()} className="btn btn-secondary w-full">QUERY</button>
          {isLoading &&
            <div className="flex justify-center	mt-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
            </div>
          }
        </div>
        {renderResults()}
      </div>
    </div>
    
  );
}

export default MetadataQuery;
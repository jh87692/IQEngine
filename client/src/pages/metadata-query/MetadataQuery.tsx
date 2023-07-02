//react functional component
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queries} from './queries';

// account: Optional[List[str]] = Query([]),
//     container: Optional[List[str]] = Query([]),
//     min_frequency: Optional[float] = Query(None),
//     max_frequency: Optional[float] = Query(None),
//     author: Optional[str] = Query(None),
//     label: Optional[str] = Query(None),
//     comment: Optional[str] = Query(None),
//     description: Optional[str] = Query(None),
//     min_datetime: Optional[datetime] = Query(None),
//     max_datetime: Optional[datetime] = Query(None),
//     text: Optional[str] = Query(None),
//     metadataSet: Collection[Metadata] = Depends(database.database.metadata_collection),
const fetchData = async () => {
  const response = await fetch('http://127.0.0.1:5000/api/datasources/query?min_frequency=8486000000',
    { 
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
    });
  return response.json();
}

const MetadataQuery = () => {
  const [selections, setSelections] = useState(queries);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  const {isLoading, fetchStatus, status, data, error, refetch} = useQuery(['metadata-query'], fetchData, {
    enabled: false,
  });

  const toggleSelected = (e) => {
    const name = e.target.name;
    const newSelections = {...selections};
    newSelections[name].selected = !newSelections[name].selected;
    newSelections[name].queryString = "";
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
    newSelections[name].queryString = value;
    setSelections(newSelections);
  }

  const handleQueryInvalid = (name: string) => {
    const newSelections = {...selections};
    newSelections[name].queryString = "";
    setSelections(newSelections);
  }

  const showQueryButton = () => {
    let empty = true;
    for (let item of Object.keys(selections)) {
      if(selections[item].selected) {
        empty = false;
      }
      if (selections[item].selected && selections[item].queryString === ""){
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
    console.log('we have some data!');
    console.log(data);
    return data.map((item) => <p>blah</p>);
  }

  const handleQuery = () => {
    refetch();
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
          {isLoading && fetchStatus === "fetching" &&
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          }
        </div>
        {renderResults()}
      </div>
    </div>
    
  );
}

export default MetadataQuery;
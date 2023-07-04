import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SigMFMetadata, Annotation, CaptureSegment } from '@/utils/sigmfMetadata';
import FileRow from '@/pages/recordings-browser/File';

const queryAPI = async (queryString) => {
  const response = await fetch(`http://127.0.0.1:5000/api/datasources/query?${queryString}`);
  const data = await response.json();
  return data;
}

export const Results = ({ queryString }) => {
  const { isLoading, data } = useQuery<SigMFMetadata[]>(['metadata-query', queryString], () => queryAPI(queryString));
  if(!queryString)
    return null;

  const renderResults = () => {
    if(!data) 
      return;
    return data.map((item, i) => {
      item = Object.assign(new SigMFMetadata(), item);
      item.annotations = item.annotations?.map((annotation) =>
        Object.assign(new Annotation(), annotation)
      );
      item.captures = item.captures?.map((capture) =>
        Object.assign(new CaptureSegment(), capture)
    );
      return (
          <FileRow key={i} item={item} />
      )
    });
    
  }
  return (
    <div>
        {isLoading && <div className="flex justify-center	mt-10">
          <div className="mb-10 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>}
        <div className="flex justify-center	mt-10">
          <div className="grid grid-cols-1 gap-4">
            {renderResults()}
          </div>
        </div>
        
      </div>
  )
}

export default Results;
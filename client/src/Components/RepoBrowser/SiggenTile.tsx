// Copyright (c) 2022 Microsoft Corporation
// Copyright (c) 2023 Marc Lichtman
// Licensed under the MIT License

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SiggenTile = (props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/siggen');
  };

  return (
    <div class="card w-96 bg-neutral text-neutral-content shadow-xl mb-3">
      <figure><img class="object-cover h-48 w-96" src="/siggen.png" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 className="card-title">SigGen</h2>
          <p>Generate your own signals in Python, with examples! and save as a SigMF recording</p>
          <div className="card-actions mt-2 justify-end">
            <button onClick={handleOnClick} className="btn btn-primary w-full" >view</button>
          </div>
        </div>
    </div>
  );
};

export default SiggenTile;

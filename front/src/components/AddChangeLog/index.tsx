import React, {useState} from 'react'
import paths from '../../utils/paths.json';

import { Button, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import parseAccessToken from '../../utils/parseAccessToken';

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type response = {
  msg: string
}

function AddChangeLog() {
  const [message, setMessage] = useState('');
  const [announce, setAnnounce] = useState(true);

  function handleSubmit() {
    fetch(`${reqPath}tools/changelog`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': parseAccessToken()
        },
        body: JSON.stringify({  
          log: message,
          announce
        })
      })
      .then(res => res.json())
      .then((json: response) => {
        console.log(json);
      });
  }

  return (
    <div>
      <br/>
      <h1>Add to Changelog</h1>

      <TextField 
        multiline
        value={message}
        onChange={e => setMessage(e.currentTarget.value)}
        fullWidth
      >
      </TextField>

      <br/>
      
      <FormControlLabel control={
        <Checkbox
          checked={announce}
          onChange={e => setAnnounce(e.target.checked)}
          name="Announce"
          color="primary"
       />
      } label="Announce"/>

      <br/>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Add
      </Button>




      <br/>
    </div>
  )
}

export default AddChangeLog;
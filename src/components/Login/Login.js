import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Login.css';

export default function SignIn() {
  const [name, setName] = useState('');

  return (
    <div className="outContainer">
      <div className="innerContainer">
        <h1 className="heading">Iniciar</h1>
        <div>
          <input placeholder="Nombre" className="loginInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from '../components/Users';
import Menu from './Menu';
import Publicaciones from '../components/Publicaciones';
import Tareas from '../components/Tareas';


const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path='/' component={Users} />
      <Route exact path='/tasks' component={Tareas} />
      <Route exact path='/publicaciones/:key' component={Publicaciones} />
    </div>
  </BrowserRouter>
);

export default App;
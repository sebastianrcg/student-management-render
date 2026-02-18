import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './elements/root/Root';
import Students from './elements/students/Students';
import Edit from './elements/students/Edit';
import Create from './elements/students/Create';
import Read from './elements/students/Read';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Students />}/>
    <Route path="edit/:id" element={<Edit />}/>
    <Route path="read/:id" element={<Read />}/>
    <Route path="create" element={<Create />}/>

  </Route>
))

const App = () =>{
  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
// const App = () =>{
//   return(
//     <div>
//       <BrowserRouter >
//         <Routes>
//           <Route path="/" element={ <Home />} />
//           <Route path="/create" element={<Create/>} />
//           <Route path='/edit/:id' element={<Edit/>} />
//           <Route path="/read/:id" element={<Read />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

export default App;
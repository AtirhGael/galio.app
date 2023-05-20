import {Route, Routes} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Register from './Register'

const Router = () => {
    return(
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
    )
    };
  export default Router
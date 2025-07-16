import React, { useEffect,useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import RegistrationForm from './pages/LoginPage'
import Index from './component/index'

import ProtectedRoute from './routes/ProtectedRoute'
const App = () => {
  
  
  

  return (
       <Router>
      <Routes>
        
        <Route path='/login' element={<RegistrationForm/>} />
       
        <Route path='*' element={
          <ProtectedRoute>
          <Index/>
          </ProtectedRoute>
          } 
          
          />

    </Routes>
    </Router>
        
      
  )
}

export default App

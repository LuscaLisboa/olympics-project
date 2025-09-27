import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import HomePage from './pages/HomePage'
import Introduction from './pages/Introduction'

function App() {

  return (
    <>
      <div className='flex min-h-screen bg-slate-100'>
        <Sidebar />
        <div className='flex-1 lg:ml-72'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/introduction" element={<Introduction />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App

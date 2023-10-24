import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Pages/Login/Login'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import RequireAuth from './components/Route/ProtectedRoute/RequireAuth'
import TeacherDashboard from './components/Pages/Dashboards/Teacher/TeacherDashboard'
import StudentDashboard from './components/Pages/Dashboards/Student/StudentDashboard'
import DashboardHome from './components/Pages/Dashboards/DashboardHome'
import DashboardCalendar from './components/Pages/Dashboards/DashboardCalendar'
import TeacherClass from './components/Pages/Dashboards/Teacher/TeacherClass'
import ClassParticipants from './components/Pages/Dashboards/Teacher/ClassParticipants'
import NoteCards from './components/Pages/Dashboards/Teacher/NoteCards'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>   {/*Tell in which store to get the data*/}
    <React.StrictMode >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path='/teacherDashboard' element={<TeacherDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path='teacherClass' element={<TeacherClass />} >
                <Route path='noteCards' element={<NoteCards />} />
                <Route path='classParticipants' element={<ClassParticipants />} />
              </Route>
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/studentdashboard' element={<StudentDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
            </Route>
          </Route>
          {/* <Route path='/tseacherDashboard' element={<TeacherDashboard />} /> */}
          {/* <Route path='/studentdashboard' element={<StudentDashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    {/* </ApiProvider> */}
  </Provider>

)

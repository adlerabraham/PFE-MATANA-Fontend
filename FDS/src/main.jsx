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
import Flux from './components/Pages/Dashboards/Teacher/Flux'
import NoteCards from './components/Pages/Dashboards/Teacher/NoteCards'
import ClassBoard from './components/Pages/Dashboards/ClassBoard'
import StudentList from './components/Pages/Dashboards/Teacher/StudentList'
import NoteCardList from './components/Pages/Dashboards/Teacher/NoteCardList'
import NoteCardTable from './components/Pages/Dashboards/Teacher/NoteCardTable'
import NoteCardTableView from './components/NoteCardTable/NoteCardTableView'
import NoteCardTableCreate from './components/NoteCardTable/NoteCardTableCreate'
import NoteCardTableEdit from './components/NoteCardTable/NoteCardTableEdit'
import CoordinatorDashboard from './components/Pages/Dashboards/Coordinator/CoordinatorDashboard'
import CoordinatorDashboardHome from './components/Pages/Dashboards/Coordinator/CoordinatorDashboardHome'
import ProgramManagement from './components/Pages/Dashboards/Coordinator/ProgramManagement'
import LevelClasses from './components/Pages/Dashboards/Coordinator/LevelClasses'
import LevelClassesHome from './components/Pages/Dashboards/Coordinator/LevelClassesHome'
import TranscriptList from './components/Pages/Dashboards/Coordinator/TranscriptList'
import ValidateTranscript from './components/Pages/Dashboards/Coordinator/ValidateTranscript'
import StudentClass from './components/Pages/Dashboards/Student/StudentClass'
import StudentFlux from './components/Pages/Dashboards/Student/StudentFlux'
import StudentsGrades from './components/Pages/Dashboards/Student/StudentsGrades'
import RequestForm from './components/Pages/Dashboards/Student/RequestForm'
import Transition from './components/Pages/Dashboards/Student/Transition'
import TranscriptRequest from './components/Pages/Dashboards/Student/TranscriptRequest'
import PaymentPage from './components/Pages/Payment/PaymentPage'
import TranscriptReview from './components/Pages/Dashboards/Student/TranscriptReview'
import CertificateRequest from './components/Pages/Dashboards/Student/CertificateRequest'
import CertificateReview from './components/Pages/Dashboards/Student/CertificateReview'
import DocViewer from './components/Pages/Doc/DocViewer'
import TranscriptViewer from './components/Pages/Doc/TranscriptViewer'
import CertificateViewer from './components/Pages/Doc/CertificateViewer'
import AcademicYears from './components/Pages/Dashboards/Teacher/Archive/AcademicYears'
import Periods from './components/Pages/Dashboards/Teacher/Archive/Periods'
import ArchivedCourses from './components/Pages/Dashboards/Teacher/Archive/ArchivedCourses'
import CoordinatorArchiveHome from './components/Pages/Dashboards/Coordinator/Archive/CoordinatorArchiveHome'
import PaymentPageBuffer from './components/Pages/Payment/PaymentPageBuffer'
import StudentPeriods from './components/Pages/Dashboards/Student/Archive/StudentPeriods'
import CoordinatorPeriods from './components/Pages/Dashboards/Coordinator/Archive/CoordinatorPeriods'
import ArchiveProgramManagement from './components/Pages/Dashboards/Coordinator/Archive/ArchiveProgramManagement'
import DirectorDashboard from './components/Pages/Dashboards/Director/DirectorDashboard'
import DirectorCalendar from './components/Pages/Dashboards/Director/DirectorCalendar'
import DirectorDashbordHome from './components/Pages/Dashboards/Director/DirectorDashbordHome'
import OrderStat from './components/Pages/Dashboards/Director/OrderStat'
import ClassOptions from './components/Pages/Dashboards/Coordinator/ClassOptions'
import CoordinatorFlux from './components/Pages/Dashboards/Coordinator/CoordinatorFlux'
import ExamManagement from './components/Pages/Dashboards/Coordinator/ExamManagement'
import ExamView from './components/Pages/Dashboards/Coordinator/Exam/ExamView'
import ExamCreate from './components/Pages/Dashboards/Coordinator/Exam/ExamCreate'
import ExamUpdate from './components/Pages/Dashboards/Coordinator/Exam/ExamUpdate'




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>   {/*Tell in which store to get the data*/}
    <React.StrictMode >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/************* DASHBOARDS ***************/}
          {/****************DIRECTOR'S ROUTES SET UP****************/}
          <Route path='/directorDashboard' element={<DirectorDashboard />}>
            <Route index element={<DirectorDashbordHome />} />
            <Route path='directorCalendar' element={<DirectorCalendar />} />
            {/* <Route path='orderStat' element={<OrderStat />} /> */}
          </Route>
          <Route element={<RequireAuth />}>


            {/****************COORDINATOR'S ROUTES SET UP****************/}
            <Route path='/coordinatorDashboard' element={<CoordinatorDashboard />}>
              <Route index element={<CoordinatorDashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path=':programId' element={<ProgramManagement />} >
                <Route path=':levelID' element={<LevelClasses />}>
                  <Route index element={<LevelClassesHome />} />
                  <Route path=':classID' element={<ClassBoard />}>
                    <Route path='classOptions' element={<ClassOptions />}>
                      <Route index element={<CoordinatorFlux />} />
                      <Route path='transcriptList' element={<TranscriptList />}>
                        <Route path='noteCardTable' element={<NoteCardTable />}>
                          <Route path='view' element={<NoteCardTableView />} />
                          <Route path='create' element={<NoteCardTableCreate />} />
                          <Route path='update' element={<NoteCardTableEdit />} />
                          <Route path=':transcript' element={<ValidateTranscript />}></Route>
                        </Route>
                      </Route>
                      <Route path='exam' element={<ExamManagement />}>
                        <Route index element={<ExamView />} />
                        <Route path='create' element={<ExamCreate />} />
                        <Route path='update' element={<ExamUpdate />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
              {/*************  ARCHIVE  *************/}
              <Route path='academicYears' element={<AcademicYears />}>
                <Route path=':acaYearId' element={<CoordinatorPeriods />}>
                  <Route path=':periodId' element={<CoordinatorArchiveHome />}>
                    <Route index element={<CoordinatorDashboardHome />} />
                    <Route path=':programId' element={<ArchiveProgramManagement />} >
                      <Route path=':levelID' element={<LevelClasses />}>
                        <Route index element={<LevelClassesHome />} />
                        <Route path=':classID' element={<ClassBoard />}>
                          <Route path='transcriptList' element={<TranscriptList />}>
                            <Route path='noteCardTable' element={<NoteCardTable />}>
                              <Route path='view' element={<NoteCardTableView />} />
                              <Route path='create' element={<NoteCardTableCreate />} />
                              <Route path='update' element={<NoteCardTableEdit />} />
                              <Route path=':transcript' element={<ValidateTranscript />}></Route>
                            </Route>
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* TEACHER'S ROUTES SET UP */}
            <Route path='/teacherDashboard' element={<TeacherDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path=':classID' element={<ClassBoard />}>
                <Route path='teacherClass' element={<TeacherClass />} >
                  <Route path='noteCards' element={<NoteCards />} >
                    <Route path=':levelID' element={<NoteCardList />} >
                      <Route path='noteCardTable' element={<NoteCardTable />}>
                        <Route path='view' element={<NoteCardTableView />} />
                        <Route path='create' element={<NoteCardTableCreate />} />
                        <Route path='update' element={<NoteCardTableEdit />} />
                      </Route>
                    </Route>
                  </Route>
                  <Route path='classParticipants' element={<ClassParticipants />} >
                    <Route path=':levelID' element={<StudentList />}></Route>
                  </Route>
                  <Route index element={<Flux />}></Route>
                </Route>
              </Route>
              <Route path='academicYears' element={<AcademicYears />}>
                <Route path=':acaYearId' element={<Periods />}>
                  <Route path=':periodId' element={<ArchivedCourses />} />
                </Route>
              </Route>
            </Route>

            {/* STUDENT'S ROUTES SET UP */}
            <Route path='/studentdashboard' element={<StudentDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path=':classID' element={<ClassBoard />}>
                <Route path='studentClass' element={<StudentClass />}>
                  <Route index element={<StudentFlux />}></Route>
                  <Route path='studentGrades' element={<StudentsGrades />} />
                </Route>
              </Route>
              <Route path='requestForm' element={<RequestForm />}>
                <Route path=':documentId' element={<Transition />}>
                  <Route path='certificate' element={<CertificateRequest />} />
                  <Route path='transcript' element={<TranscriptRequest />} />
                </Route>
              </Route>
              <Route path='transcriptReview' element={<TranscriptReview />} />
              <Route path='certificateReview' element={<CertificateReview />} />
              <Route path='academicYears' element={<AcademicYears />}>
                <Route path=':acaYearId' element={<StudentPeriods />}>
                  <Route path=':periodId' element={<ArchivedCourses />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* STUDENT'S ROUTES SET UP */}
          {/* <Route element={<RequireAuth />}>
            <Route path='/studentdashboard' element={<StudentDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path=':classID' element={<ClassBoard />}>
                <Route path='studentClass' element={<StudentClass />}>
                  <Route index element={<StudentFlux />}></Route>
                  <Route path='studentGrades' element={<StudentsGrades />} />
                </Route>
              </Route>
              <Route path='requestForm' element={<RequestForm />}>
                <Route path=':documentId' element={<Transition />}>
                  <Route path='certificate' element={<CertificateRequest />} />
                  <Route path='transcript' element={<TranscriptRequest />} />
                </Route>
              </Route>
              <Route path='transcriptReview' element={<TranscriptReview />} />
              <Route path='certificateReview' element={<CertificateReview />} />
              <Route path='academicYears' element={<AcademicYears />}>
                <Route path=':acaYearId' element={<StudentPeriods />}>
                  <Route path=':periodId' element={<ArchivedCourses />} />
                </Route>
              </Route>
            </Route>
          </Route> */}
          <Route path='/fds-payment' element={<PaymentPageBuffer />} >
            <Route path=':docId' element={<PaymentPage />} />
          </Route>
          <Route path=':orderId' element={<DocViewer />} >
            <Route path='transcript' element={<TranscriptViewer />} />
            <Route path='certificate' element={<CertificateViewer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>

)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Theory from './pages/Theory';
import Techniques from './pages/Techniques';
import Quiz from './pages/Quiz';
import TheoryQuiz from './pages/quiz/TheoryQuiz';
import TechniqueQuiz from './pages/quiz/TechniqueQuiz';
import QuizResults from './pages/quiz/QuizResults';
import Workouts from './pages/Workouts';
import Games from './pages/Games';
import Challenges from './pages/Challenges';
import OnlineEvents from './pages/OnlineEvents';
import Chats from './pages/Chats';
import Reels from './pages/Reels';
import Teachers from './pages/Teachers';
import TeachersDetails from './pages/teachers/TeachersDetails';
import ChoreographyVideos from './pages/teachers/ChoreographyVideos';
import Courses from './pages/Courses';
import CourseDetails from './pages/courses/CourseDetails';
import UserEnroll from './pages/courses/UserEnroll';
import UserPayments from './pages/courses/UserPayments';
import UserEnquiry from './pages/courses/UserEnquiry';
import ClassSchedule from './pages/ClassSchedule';
import Users from './pages/Users';
import UserDetails from './pages/users/UserDetails';
import UserPreference from './pages/users/UserPreference';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/theory"
          element={
            <ProtectedRoute>
              <Layout>
                <Theory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/techniques"
          element={
            <ProtectedRoute>
              <Layout>
                <Techniques />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Layout>
                <Quiz />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/theory"
          element={
            <ProtectedRoute>
              <Layout>
                <TheoryQuiz />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/technique"
          element={
            <ProtectedRoute>
              <Layout>
                <TechniqueQuiz />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/results"
          element={
            <ProtectedRoute>
              <Layout>
                <QuizResults />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <Layout>
                <Workouts />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Layout>
                <Games />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Layout>
                <Challenges />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/online-events"
          element={
            <ProtectedRoute>
              <Layout>
                <OnlineEvents />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Layout>
                <Chats />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reels"
          element={
            <ProtectedRoute>
              <Layout>
                <Reels />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Layout>
                <Teachers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers/details"
          element={
            <ProtectedRoute>
              <Layout>
                <TeachersDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers/choreography"
          element={
            <ProtectedRoute>
              <Layout>
                <ChoreographyVideos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/details"
          element={
            <ProtectedRoute>
              <Layout>
                <CourseDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/enroll"
          element={
            <ProtectedRoute>
              <Layout>
                <UserEnroll />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/payments"
          element={
            <ProtectedRoute>
              <Layout>
                <UserPayments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/enquiry"
          element={
            <ProtectedRoute>
              <Layout>
                <UserEnquiry />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-schedule"
          element={
            <ProtectedRoute>
              <Layout>
                <ClassSchedule />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/details"
          element={
            <ProtectedRoute>
              <Layout>
                <UserDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/preference"
          element={
            <ProtectedRoute>
              <Layout>
                <UserPreference />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

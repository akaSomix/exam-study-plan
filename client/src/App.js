import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

import { useState, useEffect, React } from 'react';
import ErrorBanner from './components/ErrorBanner';



const courseService = require('./service/courseService').default;
const studyPlanService = require('./service/studyPlanService').default;
const userService = require('./service/userService').default;

function App() {

  // Courses State representation
  const [courses, setCourses] = useState([]);

  // Student Type representation
  const [studentType, setStudentType] = useState('');

  // Study Plan Courses representation
  const [studyPlanCourses, setStudyPlanCourses] = useState([]);

  // Dirty flag
  const [dirty, setDirty] = useState(true);

  // Errors
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [loginError, setLoginError] = useState({});

  // Credentials State
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  // Loadings
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  /*
   *  -- API CONNECTION -- 
   */

  const login = (credentials) => {
    setLoginError({});
    setLoginLoading(true);
    userService.logIn(credentials)
      .then(user => {
        setIsLogged(true);
        setUser(user);
        setLoginLoading(false);
        setDirty(true);
      })
      .catch(err => {
        console.error({ err });
        setLoginError({ message: err });
        setLoginLoading(false);
      }
      );
  };

  const logout = async () => {
    await userService.logOut();
    setIsLogged(false);
    setUser({});
  };

  const createStudyPlan = async (studentType, courses) => {
    try {
      const studyPlanCreated = await studyPlanService.createStudyPlan(studentType, courses);
      setStudentType(studyPlanCreated.studentType);
      setDirty(true);

    } catch (error) {
      console.error(error);
      setFetchErrorMessage('There was an error creating study plan. Please wait and try reloading the page.');
    }
  }

  const deleteStudyPlan = async () => {
    try {
      await studyPlanService.deleteStudyPlan();

      setStudentType('');
      setStudyPlanCourses([]);
      setDirty(true);
    } catch (error) {
      console.error(error);
      setFetchErrorMessage('There was an error deleting study plan. Please wait and try reloading the page.');
    }
  }

  const saveStudyPlan = async (courses) => {
    try {
      if (studyPlanCourses !== courses) {
        await studyPlanService.updateStudyPlan(courses);
        setDirty(true);
      }
    } catch (error) {
      console.error(error);
      setFetchErrorMessage('There was an error saving study plan. Please wait and try reloading the page.');
    }
  }



  /*
   *  -- USE EFFECT HOOKS -- 
   */

  // Logged In hook
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Retrieve the user 
        const user = await userService.getUserInfo();
        setUser(user);
        setIsLogged(true);
      } catch (err) {
        console.warn(err);
      }
    };
    checkAuth();
  }, []);

  // Get all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesFromDB = await courseService.getAllCourses();
        setLoading(false);
        setCourses(coursesFromDB);
      }
      catch (error) {
        console.error(`Couldn't Retrieve Data from API due to: ${error} `);
        setLoading(false);
        setFetchErrorMessage('There was an error retrieving courses. Please wait and try reloading the page.');
      }
    };
    fetchData();
  }, [dirty]);

  // Get StudyPlan
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studyPlan = await studyPlanService.getStudyPlan();
        setStudentType(studyPlan.studentType);
        setStudyPlanCourses(studyPlan.courses);
      }
      catch (error) {
        console.error(`Couldn't Retrieve Data from API due to: ${error} `);

        // Set studentType and courses to default
        setStudentType('');
        setStudyPlanCourses([]);
      }
      finally {
        setLoading(false);
        setDirty(false);
      }
    };
    if (isLogged && dirty) {
      fetchData();
    }
  }, [isLogged, user.name, dirty]);


  /*
   *  -- JSX Composition -- 
   */
  return (
    <div className="bg-background-100 min-h-screen min-w-max">
      <BrowserRouter>
        <Header isLogged={isLogged} user={user} logout={logout} />
        <div className='lg:mx-56 md:mx-24 mx-4'>
          {
            fetchErrorMessage &&
            <ErrorBanner message={fetchErrorMessage} />
          }
          <Routes>
            <Route exact path='/'
              element={<HomePage
                isLogged={isLogged}
                studyPlanCourses={studyPlanCourses}
                studentType={studentType}
                courses={courses}
                loading={loading}
                createStudyPlan={createStudyPlan}
                deleteStudyPlan={deleteStudyPlan}
                saveStudyPlan={saveStudyPlan}
              />}
            />
            <Route exact path='/login'
              element={<LoginPage isLogged={isLogged} login={login} loginError={loginError} loading={loginLoading} />}
            />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

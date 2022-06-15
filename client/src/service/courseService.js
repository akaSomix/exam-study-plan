const BASE_URL = new URL('http://localhost:3001/api/courses');

/*
 * COURSES API 
 */
async function getAllCourses() {

  // call: GET /api/courses
  const response = await fetch(`${BASE_URL}/`, { method: 'GET' });

  const coursesJson = await response.json();

  console.log({ courses: coursesJson.filter(c => c.maxStudents) });

  if (response.ok) {
    // return courses list
    return coursesJson;

  } else {
    throw coursesJson;
  }
}

async function getCourseDetails(courseID) {

  // call: GET /api/courses
  const response = await fetch(`${BASE_URL}/${courseID}/details`, { method: 'GET' });

  const courseDetailJson = await response.json();

  if (response.ok) {
    // return courses list
    return courseDetailJson;

  } else {
    throw courseDetailJson;
  }
}

async function getIncompatiblesByCourseList(courses) {

  // call: POST /api/courses
  const response = await fetch(`${BASE_URL}/incompatibles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courses }),
  });

  const incompatibles = await response.json();

  if (response.ok) {
    // return incompatible courses list
    return incompatibles;

  } else {
    throw incompatibles;
  }
}



const courseService = { getAllCourses, getCourseDetails, getIncompatiblesByCourseList };
export default courseService;

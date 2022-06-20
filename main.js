
// AXIOS returns a PROMISE, so we have to handle it using then and catch.

// AXIOS GLOBALS
//axios.defaults.headers.common['X-Auth-Token'] = 'some token'; // to get some token

axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // take acutal token from www.jwt.io
//you can get token from server after logging in, might store it in local storage, and after that put it into global. If we make any request that token is available inn config. and we can validate that on the server.

// GET REQUEST
/*function getTodos() {
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    params: {   // to add parameters
      _limit: 5  // will limit elements. only 5 elements will be there now
    }
  })
  //.then(res => console.log(res.data))// to console log
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}*/

// short way to implement above functionality
function getTodos() {
  /*axios.get('https://jsonplaceholder.typicode.com/todos', {
    params: { _limit: 5}
  })*/
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout: 7000}) 
  //GET is default so we can write axios(url) instead of axios.get(url)
  // timeout is a parameter till which it waits for response before timeout. it is in miliseconds.
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
  /*axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'New Todo',
      completed: false
    }
  })*/
  axios
  .post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// PUT/PATCH REQUEST  // to update, put will replace entire resource. Patch will do incrementally

/*function updateTodo() {   // PUT
  axios
  .put('https://jsonplaceholder.typicode.com/todos/1', { // we are updating todo with id 1
    title: 'Updated Todo',    // data we want to update
    completed: true
  })  // put replaces the complete todo, so the new todo will not have userid as we have not mentioned it in parameters.
  .then(res => showOutput(res))
  .catch(err => console.log(err));
} */

function updateTodo() {   //patch
  axios
  .patch('https://jsonplaceholder.typicode.com/todos/1', { // we are updating todo with id 1
    title: 'Updated Todo',    // data we want to update
    completed: true
  })  // patch will only update the parts we specify in request, so todo will have userid, as only title and completed is changed.
  .then(res => showOutput(res))
  .catch(err => console.log(err));
} 

// DELETE REQUEST
function removeTodo() {
  axios
  .delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {  // to make simultaneous request or to get simultaneous data
  axios.all([   // axios.all takes array or requests, once all those requests are fulfilled we can handle them.
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'), // ?_limit to set limit of todos to get
    axios.get('https://jsonplaceholder.typicode.com/posts')  // to get both todos and posts simultaneously
  ])
  /*.then(res => {
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
  })*/
  .then(axios.spread((todos,posts) => showOutput(posts))) // can use axios.spread to show data
  .catch(err => console.log(err));
}

// CUSTOM HEADERS
// when you have to send data in headers, example is - when you already have authentication with like JSON web token, you make a request to login in, you authenticate to log in, you get back a token and now you have to send back that token in the header through access protected routes. 
function customHeaders() {

  const config = { //create a config object
    headers: {     // create a header
      'Content-Type': 'application/json',
      Authorization: 'some token'
    }
  }
  axios
  .post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false
  }, config)   // config will be our third parameter
  .then(res => showOutput(res))
  .catch(err => console.log(err)); 
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat( data => {
      data.title = data.title.toUpperCase(); // to make title in data object as upper case
      return data;
    })
  }
  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todoss1234', {
    //validateStatus: function (status) {
      //return status < 500; // reject if status is greater or equal to 500
    //}  //it will give all requests even if page not found (404) occurs as 404 is less than 500
  }) 
  //changed url not not available page 
  .then(res => showOutput(res))
  .catch(err => {
    if(err.response) {
      // server responded with a status other than 200 range (success range)
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if(err.response.status === 404) {
        alert('Error: Page not found');
      } else if (err.request) {  // request was made but no response
        console.log(err.request);
      } else {
        console.error(err.message);
      }
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
  .get('https://jsonplaceholder.typicode.com/todos', {
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)) {
      console.log('Request cancelled', thrown.message);
    }
  });

  if(true) { // example condition to cancel request
    source.cancel('Request Cancelled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(config => { //will have access to methods, requests in config
  console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`) // to access method in config and convert it to upper case, url of config and add a time stamp.

  return config;
}, 
error => {   // to check for an error
  return Promise.reject(error);
});

// AXIOS INSTANCES  

// we are till now dealing with global axios instance but we can create out own.
// in create you can have custom settings, one of which is baseURL

const axiosInstance = axios.create({
  // other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});

//axiosInstance.get('/comments').then(res => showOutput(res)); 
// get will call the baseURL by default and /comments will be added to the end of URL to make it https://jsonplaceholder.typicode.com/comments

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

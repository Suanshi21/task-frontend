// Importing the components to be used in routes
import LoginForm from './components/LoginForm.vue'; 
import SignupForm from './components/SignupForm.vue';
import TasklistForm from './components/TasklistForm.vue';
import TaskForm from './components/TaskForm.vue';

// Importing necessary functions from vue-router for routing
import { createRouter, createWebHashHistory } from 'vue-router';

// Defining the routes for the application
const routes = [
  {
    // Route for the Signup form
    name: 'SignupForm', // The name of the route
    component: SignupForm, // The component to be rendered
    path: '/signup' // The path of the route
  },
  {
    // Route for the Login form
    name: 'LoginForm',
    component: LoginForm,
    path: '/' // The home page route (login page)
  },
  {
    // Route for the Task list form
    name: 'TasklistForm',
    component: TasklistForm,
    path: '/tasklist' // The path to view all tasks
  },
  {
    // Route for adding a new task
    name: 'TaskForm',
    component: TaskForm,
    path: '/task' // The path to create or edit a task
  },
];

// Creating the router instance
const router = createRouter({
  history: createWebHashHistory(), // Using hash-based history mode for routing
  routes // Passing the defined routes to the router
});

// Exporting the router instance for use in the main application
export default router;

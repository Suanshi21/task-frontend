<template>
  <div class="login-form">
    <h1>Log In</h1>
    <form @submit.prevent="login">
      <!-- Username input field -->
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        required
        :disabled="isLoading"
      />
      <!-- Password input field -->
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
        :disabled="isLoading"
      />
      <!-- Submit button -->
      <button type="submit" :disabled="isLoading">Login</button>
    </form>

    <!-- Error message display -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Sign up link -->
    <p>Don't have an account? <router-link to="/signup">Sign up here</router-link>.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,  // Flag for loading state
    };
  },
  methods: {
    // Login method to authenticate the user
    async login() {
      this.isLoading = true;  // Disable form during request
      this.errorMessage = null;  // Reset any previous error messages
      try {
        const response = await axios.post("http://localhost:3000/users/login", {
          username: this.username,
          password: this.password,
        });

        const { token, userId } = response.data;  // Get token and userId from response

        // Store token and userId in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        this.$router.push("/task");  // Redirect to the task page
      } catch (error) {
        this.errorMessage = "Login failed. Please check your credentials.";  // Show error message
        console.error("Login failed", error);
      } finally {
        this.isLoading = false;  // Re-enable the form after request
      }
    },
  },
};
</script>

<style>
.login-form {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;  /* Light background color */
  border-radius: 8px;  /* Rounded corners */
}

.login-form input {
  width: 100%;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Prevents padding from increasing width */
}

.login-form button {
  width: 100%;
  height: 40px;
  border: 1px solid maroon;
  color: white;
  background-color: maroon;
  cursor: pointer;
  border-radius: 5px;
  box-sizing: border-box;
}

.login-form button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.login-form p {
  margin-top: 20px;
}

.login-form p a {
  color: maroon;
  text-decoration: none;
}

.login-form p a:hover {
  text-decoration: underline;
}
</style>

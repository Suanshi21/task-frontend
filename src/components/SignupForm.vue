<template>
  <div class="signup-form">
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
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
      <!-- Confirm Password input field -->
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm Password"
        required
        :disabled="isLoading"
      />
      <!-- Submit button -->
      <button type="submit" :disabled="isLoading">Sign Up</button>
    </form>

    <!-- Error message display -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Login link -->
    <p>Already have an account? <router-link to="/">Login here</router-link>.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      isLoading: false,  // Loading state flag
      errorMessage: null  // Error message state
    };
  },
  methods: {
    // Signup method for creating a new user
    async signup() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      this.isLoading = true;  // Disable form during request
      this.errorMessage = null;  // Reset any previous error messages

      try {
        await axios.post("http://localhost:3000/users/signup", {
          username: this.username,
          password: this.password,
        });
        alert("Registration successful");
        this.$router.push("/");  // Redirect to login page after success
      } catch (error) {
        this.errorMessage = "Signup failed. Please try again.";  // Show error message
        console.error("Signup failed", error);
      } finally {
        this.isLoading = false;  // Re-enable the form after request
      }
    },
  },
};
</script>

<style>
.signup-form {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;  /* Light background color */
  border-radius: 8px;  /* Rounded corners */
}

.signup-form input {
  width: 100%;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Prevents padding from increasing width */
}

.signup-form button {
  width: 100%;
  height: 40px;
  border: 1px solid maroon;
  color: white;
  background-color: maroon;
  cursor: pointer;
  border-radius: 5px;
}

.signup-form button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.signup-form p {
  margin-top: 20px;
}

.signup-form p a {
  color: maroon;
  text-decoration: none;
}

.signup-form p a:hover {
  text-decoration: underline;
}
</style>

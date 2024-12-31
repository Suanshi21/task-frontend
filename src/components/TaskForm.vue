<template>
  <div class="form-container">
    <h2>Add New Task</h2>
    <form @submit.prevent="addTask">
      <!-- Task Title input -->
      <input
        type="text"
        v-model="title"
        placeholder="Task Title"
        required
        :disabled="isLoading"
      />
      <!-- Task Description textarea -->
      <textarea
        v-model="description"
        placeholder="Description"
        required
        :disabled="isLoading"
      ></textarea>
      <div class="button-group">
        <!-- Submit button for adding task -->
        <button type="submit" :disabled="isLoading">Add Task</button>
        <!-- Button to view all tasks -->
        <button type="button" @click="viewTasks" :disabled="isLoading">
          View Tasks
        </button>
      </div>
    </form>
    <!-- Button to go back to home -->
    <button @click="goBack" :disabled="isLoading">Back</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      description: "",
      isLoading: false,  // Loading state flag
    };
  },
  methods: {
    // Add new task to the database
    async addTask() {
      this.isLoading = true;
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please log in.");
        }

        const response = await axios.post(
          "http://localhost:3000/tasks",
          {
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Task added successfully", response.data);
        alert("Task added successfully");
        this.$emit("task-added");
      } catch (error) {
        console.error("Error adding task:", error.response?.data || error);
        alert("Failed to add task. Please try again.");
      } finally {
        this.isLoading = false; // Disable loading state
      }
    },
    // Navigate to task list page
    viewTasks() {
      this.$router.push("/tasklist");
    },
    // Navigate back to home page
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.form-container {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.form-container input,
.form-container textarea {
  width: 100%;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 60px;
}

.button-group button {
  width: 55%;
  height: 40px;
  border: 1px solid maroon;
  color: white;
  background-color: maroon;
  cursor: pointer;
  border-radius: 5px;
}

.form-container button {
  width: 100%;
  height: 40px;
  border: 1px solid maroon;
  color: white;
  background-color: maroon;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.form-container button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>

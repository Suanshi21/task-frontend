<template>
  <div class="task-list-page">
    <h2>Task List</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through tasks and display them -->
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Button to go back to task page -->
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [], // Stores the list of tasks
    };
  },
  methods: {
    // Fetch tasks from the server
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please log in.");
        }

        const response = await axios.get("http://localhost:3000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });

        this.tasks = response.data; // Store fetched tasks
        console.log("Tasks fetched successfully", this.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error);
        alert("Failed to fetch tasks. Please try again.");
      }
    },
    // Go back to the task page
    goBack() {
      this.$router.push("/task");
    },
  },
  mounted() {
    this.fetchTasks(); // Fetch tasks when the component is mounted
  },
};
</script>

<style>
.task-list-page {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: maroon;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>

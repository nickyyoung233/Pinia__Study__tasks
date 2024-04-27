<template>
  <form @submit.prevent="submitHandler">
    <input type="text" v-model="title" placeholder="I need to ..." required />
    <button>Add Task</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/TaskStore";
const title = ref("");
const taskStore = useTaskStore();

function submitHandler() {
  if (title === "") return;
  taskStore.addTask(title.value);
  title.value = "";
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}
form button {
  background: #ffd859;
  border: 0;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
}
form input {
  border: 0;
  padding: 10px;
  border-radius: 6px;
  color: #555;
  font-size: 1em;
}
</style>

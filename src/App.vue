<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo" />
      <h1>Pinia {{ TaskStore.title }}</h1>
    </header>
    <!-- task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <!-- <button @click="toggleHandler('all')">all</button>
      <button @click="toggleHandler('fav')">fav</button> -->
      <button @click="isFilterFav = 'all'">All tasks</button>
      <button @click="isFilterFav = 'fav'">Fav tasks</button>
    </nav>
    <template v-if="TaskStore.isLoading">
      <p class="loading">Loading...</p>
    </template>
    <template v-else>
      <Transition name="fade">
        <div v-show="isFilterFav === 'all'" class="task-list">
          <p>{{ TaskStore.total }} tasks left to do</p>
          <TaskItem
            v-for="task in TaskStore.tasks"
            :key="task.id"
            :item="task"
          />
        </div>
      </Transition>
      <Transition name="fade">
        <div v-show="isFilterFav === 'fav'" class="task-list">
          <p>{{ TaskStore.favTotal }} fav tasks left to do</p>
          <TaskItem
            v-for="task in TaskStore.favs"
            :key="task.id"
            :item="task"
          />
        </div>
      </Transition>
    </template>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "./stores/TaskStore";
import TaskItem from "@/components/TaskItem.vue";
import TaskForm from "@/components/TaskForm.vue";
const isFilterFav = ref("all");
const TaskStore = useTaskStore();
TaskStore.getTasks();

// function toggleHandler(type) {
//   type !== isFilterFav.value && (isFilterFav.value = type);
// }
</script>

<style scoped>
.task-list {
  max-width: 640px;
  margin: 20px auto;
}
/* filter nav */
.filter {
  width: 640px;
  margin: 10px auto;
  text-align: right;
}
.filter button {
  display: inline-block;
  margin-left: 10px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.8em;
  font-size: 1em;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

/* new task form */
.new-task-form {
  background: #e7e7e7;
  padding: 20px 0;
}
.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  background: #ffe9a0;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
}
</style>

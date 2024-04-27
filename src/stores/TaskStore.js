import { defineStore } from "pinia";

//defineStore返回一个function，用useTaskStore接收 便于组件中使用 组合式函数
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    _tasks: [],
    isLoading: false,
    title: "TADAAAA",
  }),
  getters: {
    tasks(state) {
      return state._tasks;
    },
    favs(state) {
      return state._tasks.filter((task) => task.isFav);
    },
    total() {
      return this._tasks.length;
    },
    favTotal() {
      return this._tasks.reduce((arr, cur) => (cur.isFav ? arr + 1 : arr), 0);
    },
  },
  actions: {
    async addTask(task) {
      const newTask = {
        id: new Date().getTime().toString(),
        // id: new Date().getTime(),
        isFav: false,
        title: task,
      };
      this._tasks.push(newTask);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      console.log(res);
      res.ok && console.log("Task added successfully");
      !res.ok && console.error(res.status, "---", res.statusText);
    },
    async delete(id) {
      this._tasks = this._tasks.filter((task) => task.id !== id);
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
      res.ok && console.log("Task added successfully");
      !res.ok && console.error(res.status, res.statusText);
    },
    async toggle(id) {
      const task = this._tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFav: task.isFav }),
      });
      res.ok && console.log("Task added successfully");
      !res.ok && console.error(res.status, "---", res.statusText);
    },
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this._tasks = data;
      this.isLoading = false;
    },
  },
});

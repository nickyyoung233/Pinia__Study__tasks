<template>
  <div class="task">
    <h3>{{ item.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="delHandler">delete</i>
      <i
        class="material-icons"
        :class="{ isRed: item?.isFav }"
        @click="favHandler"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/TaskStore";
const props = defineProps({
  item: Object,
});

const taskStore = useTaskStore();

function delHandler() {
  taskStore.delete(props.item.id);
}
function favHandler() {
  taskStore.toggle(props.item.id);
}
</script>

<style scoped>
/* task list */
.task {
  padding: 6px 20px;
  background: #fff;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task h3,
.task .icons {
  display: inline-block;
}
.task .icons {
  text-align: right;
}
.task i {
  font-size: 1.4em;
  margin-left: 6px;
  cursor: pointer;
  color: #bbb;
}
i.isRed {
  color: red;
}
</style>

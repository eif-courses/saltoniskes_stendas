<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTodoListStore } from '#imports'
const todo = ref('')
const store = useTodoListStore()
const { todoList } = storeToRefs(store)
const { toggleCompleted, deleteTodo, addTodo } = store
const current = ref(1)
const perPage = 5

function addItemAndClear(item: any) {
  if (item.length === 0)
    return
  store.addTodo(item)
  todo.value = ''
}
</script>

<template>
  <q-form @submit.prevent="addTodo(todo)">
    <q-input v-model="todo" square outlined label="Enter any text" />
    <div m3>
      <q-btn label="Add Todo" type="submit" color="primary" />
    </div>
  </q-form>

  <q-list bordered separator>
    <div v-for="todox in todoList.slice(current * perPage - perPage, current * perPage)" :key="todox.id">
      <q-item>
        <q-item-section>
          <q-checkbox v-model="todox.completed">
            <span :class="{ completed: todox.completed }">{{ todox.item }}</span>
          </q-checkbox>
        </q-item-section>
        <q-item-section avatar>
          <span cursor-pointer @click="deleteTodo(todox.id)">&#10060;</span>
        </q-item-section>
      </q-item>
      <q-separator />
    </div>
  </q-list>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="current"
      direction-links
      :max="todoList.length / perPage + 1"
    />
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>


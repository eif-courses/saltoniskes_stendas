<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '#app'
import { useTodoListStore } from '#imports'
import Card from '~/components/Card.vue'
const todo = ref('')
const store = useTodoListStore()
const { todoList } = storeToRefs(store)
const { toggleCompleted, deleteTodo, addTodo, paginatedList } = store
const current = ref(1)
const perPage = 5

function addItemAndClear(item: any) {
  if (item.length === 0)
    return
  store.addTodo(item)
  todo.value = ''
}

const { data } = useFetch('https://dummyjson.com/products/')
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <div class="q-pa-md row items-start q-gutter-md">
        <Card
          v-for="item in data.products" :key="item.id"
          :title="item.title"
          :description="item.description"
          :image="item.thumbnail"
        />
      </div>
    </template>

    <q-form @submit.prevent="addTodo(todo)">
      <q-input v-model="todo" square outlined label="Enter any text" :rules="[val => val.length >= 3 || 'Please use maximum 3 characters']" :lazy-rules="true" />
      <div m3>
        <q-btn label="Add Todo" type="submit" color="primary" />
      </div>
    </q-form>

    <q-list bordered separator>
      <div v-for="todox in paginatedList(current, perPage)" :key="todox.id">
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
  </NuxtLayout>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>

import { defineStore } from 'pinia'

interface ToDoItem {
  item: string
  id: number
  completed: boolean
}

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [] as ToDoItem[],
    id: 0,
  }),
  getters: {

  },
  actions: {
    addTodo(item: string) {
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteTodo(itemId: number) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId
      })
    },
    toggleCompleted(idToFind: number) {
      const todo = this.todoList.find(obj => obj.id === idToFind)
      if (todo)
        todo.completed = !todo.completed
    },
    paginatedList(current: number, pages: number) {
      return this.todoList.slice(current * pages - pages, current * pages)
    },

  },
},
)

import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === undefined)

export interface Todo {
  title: string
  description: string
  status: string
}

export interface TodoList {
  name: string
  todos: Todo[]
}

export interface AddTodo {
  listName: TodoList['name']
  todo: Todo
}

export interface UpdateTodo {
  listName: TodoList['name']
  todoIndex: number
  todo: Todo
}

export interface DeleteTodo {
  listName: TodoList['name']
  todoIndex: number
}

export const findTodoList = (
  todoList: TodoList[],
  listName: TodoList['name'],
) => {
  return todoList.find((list) => list.name === listName)
}

class TodoStore {
  todoList: TodoList[] = []
  formVisibility: string | boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  formVisibilityToggle = (listName?: string | boolean) => {
    this.formVisibility = listName || false
  }
  addTodoList = (listName: TodoList['name']) => {
    const { todoList } = this
    const tempTodoList = todoList.find((list) => list.name === listName)
    if (tempTodoList) return alert('List already exist')
    this.todoList.push({ name: listName, todos: [] })
  }
  addTodoItem = (data: AddTodo) => {
    const { listName, todo } = data
    const { todoList } = this
    this.formVisibilityToggle(true)
    findTodoList(todoList, listName)?.todos.push(todo)
  }
  updateTodoItem = (data: UpdateTodo) => {
    const { listName, todoIndex, todo } = data
    const { todoList } = this
    const tempTodoList = findTodoList(todoList, listName)
    if (!tempTodoList) return alert("The List isn't found")
    tempTodoList.todos[todoIndex] = todo
  }
  deleteTodoItem = (data: DeleteTodo) => {
    const { listName, todoIndex } = data
    const { todoList } = this
    const tempTodoList = findTodoList(todoList, listName)
    if (!tempTodoList) return alert("The List isn't found")
    const isConfirm = confirm('Are you sure you want to delete this todo?')
    if (isConfirm) {
      tempTodoList.todos.splice(todoIndex, 1)
    }
  }
}

export default TodoStore

let clientStore: TodoStore | undefined
export const useStore = () => {
  const store = clientStore ?? new TodoStore()

  if (typeof window === undefined) return store

  if (!clientStore) clientStore = store

  return store
}
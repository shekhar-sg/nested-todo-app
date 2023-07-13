import TodoItem from '@/src/components/todo-item'
import { TodoList, useStore } from '@/src/store/todo'
import { AnimatePresence, motion } from 'framer-motion'
import { Portal } from 'next/dist/client/portal'
import Form from '@/src/components/form'
import { observer } from 'mobx-react-lite'

interface TodoListProps {
  data: TodoList
}

const TodoList = observer((props: TodoListProps) => {
  const {
    data: { name, todos },
  } = props
  const { formVisibility, formVisibilityToggle, addTodoItem } = useStore()

  return (
    <>
      <div className={'flex flex-col h-fit gap-2'}>
        <div
          className={
            'w-72 shadow-inner bg-zinc-800 drop-shadow-2xl shadow-neutral-500 py-1 px-4 rounded-xl'
          }
        >
          <h3>list: {name}</h3>
        </div>
        <div>
          <button
            className={
              'w-72 shadow-neutral-500 shadow-inner focus:shadow-none bg-neutral-700 py-1 px-4 rounded-xl'
            }
            onClick={() => {
              formVisibilityToggle(name)
            }}
          >
            Add Todo
          </button>
        </div>
        {todos &&
          todos.map((item, index) => {
            return (
              <TodoItem
                key={index}
                data={item}
                todoIndex={index}
                listName={name}
              />
            )
          })}
      </div>
      <AnimatePresence>
        {formVisibility === name && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Portal type={'modal'}>
              <Form
                onClose={() => {
                  formVisibilityToggle(false)
                }}
                onSubmit={(data) => {
                  console.log('=>(todo-list.tsx:60) name', name)
                  addTodoItem({ listName: name, todo: data })
                  formVisibilityToggle(false)
                }}
              />
            </Portal>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default TodoList
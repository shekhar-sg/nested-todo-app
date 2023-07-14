import Form, { FormFields } from '@/src/components/form'
import { useStore } from '@/src/store/todo'
import { AnimatePresence, motion } from 'framer-motion'
import { Portal } from 'next/dist/client/portal'
import { useState } from 'react'

interface TodoItemProps {
  data: FormFields
  todoIndex: number
  listName: string
}

const TodoItem = (props: TodoItemProps) => {
  const { data, todoIndex, listName } = props
  const { title, description, status } = data
  const [isEditMode, setEditMode] = useState(false)
  const { deleteTodoItem, updateTodoItem } = useStore()

  return (
    <>
      <div
        className={
          'container prose-headings:text-white dark:text-white shadow-inner shadow-neutral-500 flex justify-between relative overflow-hidden w-72 h-32 p-3 bg-stone-600 rounded-2xl drop-shadow-xl'
        }
      >
        <div className={'flex flex-col w-52'}>
          <div className={'flex gap-1 w-auto items-center'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
            <h3 className={'m-0'}>{title}</h3>
          </div>
          <div className={'ml-1 grid gap-y-3'}>
            <span className={'text-ellipsis overflow-hidden'}>{description}</span>
            <span>{status}</span>
          </div>
        </div>
        <div className={'flex flex-col overflow-hidden justify-between gap-3 '}>
          <button
            className={'h-8 w-8 rounded-3xl text-center'}
            onClick={() => setEditMode(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mx-auto"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </button>
          <button
            className={'h-8 w-8 rounded-3xl bg-red-800 text-center'}
            onClick={() => {
              deleteTodoItem({ listName: listName, todoIndex: todoIndex })
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mx-auto"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Portal type={'modal'}>
              <Form
                onClose={() => {
                  setEditMode(false)
                }}
                data={data}
                onSubmit={(data) => {
                  updateTodoItem({
                    todo: data,
                    listName: listName,
                    todoIndex: todoIndex,
                  })
                  setEditMode(false)
                }}
              />
            </Portal>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TodoItem
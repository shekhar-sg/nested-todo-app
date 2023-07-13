'use client'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/src/store/todo'
import { Fragment, useCallback, useRef } from 'react'
import TodoList from '@/src/components/todo-list'

const Home = observer(() => {
  const { todoList, addTodoList, addTodoItem } = useStore()

  const listNameInputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    if (listNameInputRef.current && listNameInputRef.current.value) {
      addTodoList(listNameInputRef.current.value)
    }
  }, [addTodoList])

  return (
    <div
      className={
        'bg-transparent font-sans shadow-inner w-9/12 mx-auto py-5 h-[76vh] shadow-gray-700'
      }
    >
      <div className={'relative group'}>
        <div
          className={
            'absolute inset-0 motion-safe:animate-pulse opacity-75 bg-gradient-to-r from-stone-500 to-stone-300 rounded-xl w-72 mx-auto blur-md group-hover:opacity-100 transition duration-1000'
          }
        ></div>
        <div
          className={
            'flex justify-between items-center relative mx-auto w-72 bg-neutral-700 py-1 px-5 rounded-xl'
          }
        >
          <input
            className={
              'border-none focus:ring-0 w-48 p-0 bg-transparent font-bold prose-lg text-slate-400'
            }
            placeholder={'Add a list...'}
            type={'text'}
            ref={listNameInputRef}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                if (listNameInputRef.current) {
                  if (!listNameInputRef.current.value)
                    return alert('Please enter a list name')
                  handleClick()
                  listNameInputRef.current.value = ''
                }
              }
            }}
          />
          <button
            className={'h-7 w-7 rounded-3xl bg-stone-500'}
            onClick={() => {
              if (listNameInputRef.current) {
                if (!listNameInputRef.current.value)
                  return alert('Please enter a list name')
                handleClick()
                listNameInputRef.current.value = ''
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-7 h-7 mx-auto"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={'flex overflow-auto p-5'}>
        <div className={'flex gap-5 p-5'}>
          {todoList &&
            todoList.map((item, index, arr) => {
              return (
                <Fragment key={index}>
                  <TodoList data={item} />
                  {index < arr.length - 1 && (
                    <div className={'bg-neutral-700 w-1 h-3/4 my-auto'} />
                  )}
                </Fragment>
              )
            })}
        </div>
      </div>
    </div>
  )
})
export default Home
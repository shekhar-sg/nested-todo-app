'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'


export interface FormFields {
  title: string
  description: string
  status: string
}
export interface FormProps {
  onClose: () => void
  onSubmit: (data: FormFields) => void
  data?: FormFields
}

const Form = (props: FormProps) => {
  const { onClose, onSubmit,data ={}as FormFields} = props
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [status, setStatus] = useState(data.status)
  return (
    <motion.div
      className={
        'backdrop-blur-sm rounded-x shadow-2xl fixed top-0 left-0 w-full h-full'
      }
        initial={{ opacity: 0, scale:0.5}}
      animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{ opacity: 0 }}
    >
      <motion.form
        className={
          'flex flex-col gap-5 bg-transparent font-sans shadow-neutral-50 backdrop-blur-2xl shadow-inner p-10 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-fit'
        }
        onSubmit={(e) => {
          e.preventDefault()
          if (!title || !description || !status) {
            return alert('Please fill all the fields')
          }
          onSubmit({
            title,
            description,
            status,
          })
        }}
        initial={{ opacity: 0, scale: 0, y: '-200%', x: '-50%' }}
        animate={{
          opacity: 1,
          y: '-50%',
          scale: 1,
          x: '-50%',
        }}
        exit={{ opacity: 0 }}
        // transition={{ duration: 0.3, type: 'spring', bounce: 1, damping: 30 }}
      >
        <div>
          <label htmlFor="name" className={'text-white'}>Todo name</label>
          <div>
            <input
              id="name"
              name={'name'}
              type={'text'}
              required
              className={'input'}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Todo description</label>
          <div>
            <textarea
              id="description"
              name={'description'}
              required
              className={'input'}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            ></textarea>
          </div>
        </div>
        <div>
          <label htmlFor="status">Todo status</label>
          <div>
            <select
              id="status"
              name={'status'}
              required
              className={'input'}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
              }}
            >
              <option value={'lakul'}>Select</option>
              <option value={'done'}>Complete</option>
              <option value={'inProgress'}>InProgress</option>
            </select>
          </div>
        </div>
        <div className={'text-center mt-4'}>
          <button
            type={'submit'}
            className="w-3/4 rounded-3xl py-3 text-xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500"
          >
            Submit
          </button>
        </div>
        <button
          className={'w-20 text-3xl absolute top-2 -right-11 animate-pulse'}
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={5.5}
            stroke="currentColor"
            className="w-6 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.form>
    </motion.div>
  )
}
export default Form
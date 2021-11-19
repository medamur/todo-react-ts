import React, { useEffect, useMemo, useState } from 'react'
import { Task } from './interfaces'
import { typeTaskId } from './types'
import { Api } from '../../api'

const TodoList = React.lazy(() => import('./TodoList'))
const TodoAddTask = React.lazy(() => import('./TodoAddTask'))

const TodoWrap = () => {
	const [tasks, setTask] = useState<Task[]>([])

	const tasksComputed = useMemo<Task[]>(() => {
		return [
			...tasks.filter(task => task.completed).sort((a, b) => b.updated - a.updated),
			...tasks.filter(task => !task.completed).sort((a, b) => b.updated - a.updated)
		]
	}, [tasks])

	function setToTodoTask(task: Task): void {
		setTask([...tasks, task])
	}

	function deleteTodoTask(id: typeTaskId): void {
		setTask(tasks.filter(task => task.id !== id))
	}

	function changeTodoTask(id: typeTaskId, newTask: Task): void {
		setTask(tasks.map(task => {
			if (task.id === id) task = newTask
			return task
		}))
	}

	useEffect(() => {
		(async () => setTask((await Api.getTasks()) || []))()
	}, [])

	return (
		<div>
			<React.Suspense fallback={null}>
				<TodoAddTask setToTodoTask={setToTodoTask} />
			</React.Suspense>

			<br />

			{tasksComputed.length ?
				<React.Suspense fallback={null}>
					<TodoList
						tasks={tasksComputed}
						deleteTodoTask={deleteTodoTask}
						changeTodoTask={changeTodoTask}
					/>
				</React.Suspense>
				: null}

		</div>
	)
}

export default TodoWrap
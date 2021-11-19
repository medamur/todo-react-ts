import React from 'react'
import { Task } from './interfaces'


const TodoAddTask = ({ setToTodoTask }: { setToTodoTask: (task: Task) => void }) => {
	function addTask(event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void {
		if (event.code !== 'Enter' || event.target.value === '') return

		const created = Date.now()

		const task: Task = {
			title: event.target.value,
			completed: false,
			editable: false,
			id: String(created),
			updated: created,
			created
		}

		setToTodoTask(task)

		event.target.value = ''
	}

	return (
		<div>
			<input type='text' onKeyUp={addTask} />
		</div>
	)
}

export default TodoAddTask
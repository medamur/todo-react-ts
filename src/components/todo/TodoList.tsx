import React, { useEffect, useRef, useState } from 'react'
import { Task } from './interfaces'
import { typeTaskId } from './types'

const TodoList = (
	{
		tasks,
		deleteTodoTask,
		changeTodoTask
	}: {
		tasks: Task[],
		deleteTodoTask: (id: typeTaskId) => void,
		changeTodoTask: (id: typeTaskId, newTask: Task) => void
	}
) => {
	const [editableTasks, setEditableTask] = useState<{ [key: string]: Task }>({})

	function setForEditTask(task: Task): void {
		setEditableTask({ ...editableTasks, [task.id]: task })
	}

	function isSaveEditedTask(newTask: Task, oldTask: Task): boolean {
		return newTask && newTask.title !== oldTask.title
	}

	function deleteEditableTask(id: typeTaskId): void {
		if (editableTasks[id]) delete editableTasks[id]
	}

	function saveTask(task: Task, oldTask: Task): void {
		changeTodoTask(task.id, {
			...task,
			updated: isSaveEditedTask(task, oldTask) ? Date.now() : task.updated,
			editable: false
		})
		deleteEditableTask(task.id)
	}

	function withoutSaveTask(task: Task): void {
		deleteEditableTask(task.id)
		saveTask(task, task)
	}

	function editTitleTask(title: string, task: Task): void {
		setForEditTask({
			...task,
			title
		})
	}

	const [idFocusTask, setIdFocusTask] = useState<{ id: typeTaskId | null, created: number | null }>({
		id: null,
		created: null
	})

	const refInputForFocus: React.Ref<HTMLInputElement> = useRef(null)

	function editTask(task: Task): void {
		changeTodoTask(task.id, { ...task, editable: true })
		setIdFocusTask({ id: task.id, created: Date.now() })
	}

	useEffect(() => refInputForFocus.current?.focus(), [idFocusTask])

	return (
		<div>
			{tasks.map((task) => (
				<div key={task.id}>
					{
						task.editable
							? <input
								type='text'
								defaultValue={task.title}
								ref={idFocusTask.id === task.id ? refInputForFocus : null}
								onInput={(event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => editTitleTask(event.target.value, task)}
							/>
							: <b>{task.title}</b>
					}

					&nbsp;
					|
					&nbsp;

					<code>s: {new Date(task.updated).getUTCSeconds()}</code>

					&nbsp;

					<button onClick={() => deleteTodoTask(task.id)}>delete</button>

					&nbsp;

					{task.editable ?
						<button
							disabled={!isSaveEditedTask(editableTasks[task.id], task)}
							onClick={() => saveTask(editableTasks[task.id], task)}
						>
							save
						</button>
						:
						<button
							onClick={() => editTask(task)}
						>
							edit
						</button>
					}

					&nbsp;

					{task.editable ? <button onClick={() => withoutSaveTask(task)}>without save</button> : null}

					<input
						type='checkbox'
						defaultChecked={task.completed}
						onChange={(event) => changeTodoTask(task.id, {
							...task,
							updated: Date.now(),
							completed: event.target.checked
						})}
					/>
				</div>)
			)}
		</div>
	)
}

export default TodoList
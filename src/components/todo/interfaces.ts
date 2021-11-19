import { typeTaskId } from './types'

export interface Task {
	title: string
	completed: boolean
	id: typeTaskId,
	editable: boolean,
	created: number,
	updated: number
}
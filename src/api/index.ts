import { default as tasks } from '../static/tasks.json'
import { Task } from '../components/todo/interfaces'

export class Api {
	static getTasks(): Promise<Task[]> {
		return new Promise((resolve, _reject) => {
			setTimeout(() => resolve(tasks), 1000)
		})
	}
}
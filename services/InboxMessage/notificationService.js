import { postAxios } from '@/services/callApi'

const notificationService = {
	fetchAllNotification: () => {
		return postAxios({
			invoke: 'System.execute',
			argc: 2,
			"a0": "API.EmployeeInbox",
			"a1": {
				"id": localStorage.getItem('userid') ?? 0
			}
		})
	},

	updateStatusNotification: (notificationId) => {
		return postAxios({
			invoke: 'System.execute',
			argc: 2,
			"a0": "API.EmployeeInbox",
			"a1": {
				"mode": 1,
				"id": notificationId
			}
		})
	},
}

export default notificationService;

const SERVICE_URL = 'http://127.0.0.1:4000';

var _api = {
  fetchTasksList: async () => {
    return await fetch(
      'http://127.0.0.1:4000/tasks', {
        method: 'GET',
      })
      .then(async res => await res.json().then(body => ({data: body.data, error: null})))
      .catch(error => ({error, data: null}))
  },

  fetchAddTask: async (data) => {
    return await fetch(
      `${SERVICE_URL}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(async res => await res.json().then(body => ({data: body.data, error: null})))
      .catch(error => ({error, data: null}))
  },

  fetchRemoveTask: async (data) => {
    return await fetch(
      'http://127.0.0.1:4000/task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(async res => await res.json().then(body => ({data: body.data, error: null})))
      .catch(error => ({error, data: null}))
  }
}

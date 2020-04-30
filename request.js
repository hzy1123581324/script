import Fly from 'flyio/dist/npm/wx'

const request = new Fly()
const errorPrompt = (err) => {
  wx.showToast({
    title: err.message || 'fetch data error.',
    icon: 'none'
  })
}

request.interceptors.request.use((request) => {
  return request
})

request.interceptors.response.use((response, promise) => {
	response.data['token_status'] = response.headers['auth-token-status'];
  return promise.resolve(response.data);
}, (err, promise) => {
  errorPrompt(err)
  return promise.reject(err)
})


export default request

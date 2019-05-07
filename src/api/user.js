import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/api/user/list',
    method: 'GET',
    params: query
  })
}

export function deleteUser(payload) {
  return request({
    url: '/api/user/' + payload.id,
    method: 'DELETE',
    params: {
      version: payload.version
    }
  })
}

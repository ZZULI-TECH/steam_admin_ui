import request from '@/utils/request'

export function deleteGameImage(payload) {
  return request({
    url: '/api/game-image/' + payload.id,
    method: 'DELETE'
  })
}

export function saveGameImage(payload) {
  return request({
    url: '/api/game-image',
    method: 'POST',
    data: payload
  })
}

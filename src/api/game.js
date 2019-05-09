import request from '@/utils/request'

export function getGameList(query) {
  return request({
    url: '/api/game/list',
    method: 'GET',
    params: query
  })
}

export function deleteGame(payload) {
  return request({
    url: '/api/game/' + payload.id,
    method: 'DELETE',
    params: {
      version: payload.version
    }
  })
}

export function saveGame(payload) {
  return request({
    url: '/api/game',
    method: 'POST',
    data: payload
  })
}


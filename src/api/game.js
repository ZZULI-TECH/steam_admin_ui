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
    url: '/api/game/add',
    method: 'POST',
    data: payload
  })
}

export function update(game) {
  return request({
    url: '/api/game/update',
    method: 'POST',
    data: game
  })
}

export function get(id) {
  return request({
    url: '/api/game/' + id,
    method: 'GET'
  })
}

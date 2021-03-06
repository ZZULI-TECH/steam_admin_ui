import request from '@/utils/request'

export function getOrderList(query) {
  return request({
    url: '/api/order/list',
    method: 'GET',
    params: query
  })
}

export function deleteOrder(payload) {
  return request({
    url: '/api/order/' + payload.id,
    method: 'DELETE'
  })
}

export function update(row) {
  return request({
    url: '/api/order/update',
    method: 'post',
    data: row
  })
}

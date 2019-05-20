import request from '@/utils/request'

export function getList(page, size) {
  return request({
    url: `/api/msg/${page}/${size}`,
    method: 'GET'
  })
}

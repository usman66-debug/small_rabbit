import httpInstance from "@/utils/http"

/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
//！！！！！此接口在后端处理十分漫长，因此将axios实例中的timeout从5000改到10000
export const getUserOrder = (params) => {
  return httpInstance({
    url: '/member/order',
    method: 'GET',
    params
  })
}

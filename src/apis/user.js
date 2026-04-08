//所有有关用户的接口都写在这里

import httpInstance from "@/utils/http";

export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

import httpInstance from "@/utils/http";

export function detailedCategoryAPI(id) {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}

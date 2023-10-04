import axiosInstance from "../../../utils/axios"

interface ProjectInput {
  name: string
  notes: string
  user: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
  }
}

const baseApi = (route: string, method: string, data?: any) => {
  return axiosInstance.request({
    url: route,
    method,
    data,
  })
}

export const createProject = async (data: ProjectInput) => {
  return await baseApi("project", "POST", data)
}

export const updateProject = async (data: ProjectInput) => {
  return await baseApi("project", "PUT", data)
}

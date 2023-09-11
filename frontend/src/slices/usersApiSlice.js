import { apiSlice } from './apiSlice';
const USERS_URL = '/manager';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/api-token-auth/`,
        method: 'POST',
        body: data,
      }
      ),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getAvailibleProjects: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/projects/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    getTasksForUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/tasks/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    joinProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/add/user`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/delete`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getProjectTasks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}/tasks`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    getProjectInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    getProjectUsers: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}/users`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    deleteUserFromProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/delete/user`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getCurrentUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/delete`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    addTaskExecutor: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/add/user`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAvailibleProjectsMutation,
  useGetTasksForUserMutation,
  useCreateProjectMutation,
  useJoinProjectMutation,
  useDeleteProjectMutation,
  useGetProjectTasksMutation,
  useGetProjectInfoMutation,
  useGetProjectUsersMutation,
  useDeleteUserFromProjectMutation,
  useUpdateProjectMutation,
  useUpdateUserProfileMutation,
  useGetCurrentUserMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useAddTaskExecutorMutation,
  

} = userApiSlice;
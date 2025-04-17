import { Media } from "../types/media";

const baseUrl = "http://localhost:5000";

export const newApi = {
  login: (email: string, password: string) => {
    return fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  },
  register: (username: string, email: string, password: string) => {
    return fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
  },
  getUserByToken: (token: string) => {
    return fetch(`${baseUrl}/api/get/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  },

  checkUsername: (username: string) => {
    return fetch(`${baseUrl}/check-username/${username}`)
  },
  
  checkEmail: (email: string) => {
    return fetch(`${baseUrl}/check-email/${email}`)
  },
  ValidateToken: (token: string) => {
    return fetch(`${baseUrl}/api/checkToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  },
  getFactOfTheDay: () => {
    return fetch(`${baseUrl}/factOfTheDay`)
  },

  checkPassword: (token: string, password: string) => {
    return fetch(`${baseUrl}/api/user/checkPassword`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
  },
  changePassword: (token: string, password: string) => {
    return fetch(`${baseUrl}/api/changePassword`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
  },
  updateMedia: (token: string, { facebook, twitter, instagram, linkedIn }: Media) => {
    return fetch(`${baseUrl}/media`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facebook, twitter, instagram, linkedIn }),
    })
  },
  deleteUser: (token: string) => {
    return fetch(`${baseUrl}/api/delete/user`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
  }
};

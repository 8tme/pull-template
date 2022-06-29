const axios = require("axios")

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data
})

/**
 * 获取模板
 * @returns Promise 仓库信息
 */
async function getRegInfo() {
  return axios.get("https://api.github.com/users/8tme/repos")
}

/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise 版本信息
 */
async function getRegVersion(repo) {
  return axios.get(`https://api.github.com/repos/8tme/${repo}/tags`)
}

module.exports = {
  getRegInfo,
  getRegVersion
}
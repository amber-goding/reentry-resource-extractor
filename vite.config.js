const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'

export default {
  server: {
    proxy: {
      '/api': backendUrl,
    },
  },
}

import { defineStore } from 'pinia'
import { axiosInstance } from '@/lib/axios'
import { ref } from 'vue'

export const useMovieStore = defineStore('movie', () => {
  const popularMovies = ref([])
  const isLoading = ref(false)

  const getPopularMovies = async () => {
    try {
      isLoading.value = true
      const res = await axiosInstance.get('/movie/popular', {
        params: { language: 'en-US', page: 1 },
      })
      popularMovies.value = res.data.results
    } catch (error) {
      console.log(`error: ${error}`)
    } finally {
      isLoading.value = false
    }
  }

  return { getPopularMovies, popularMovies, isLoading }
})

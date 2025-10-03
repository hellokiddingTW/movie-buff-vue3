import { defineStore } from 'pinia'
import { axiosInstance } from '@/lib/axios'
import { ref } from 'vue'

export const useMovieStore = defineStore('movie', () => {
  const popularMovies = ref([])
  const upComingMovies = ref([])
  const selectedMovie = ref({})
  const isLoading = ref(false)
  const isLoadingDetail = ref(false)
  const getMovieTrailers = ref([])

  const getPopularMovies = async () => {
    try {
      isLoading.value = true
      const res = await axiosInstance.get('/movie/popular', {
        params: { language: 'en-US', page: 1 },
      })
      popularMovies.value = res.data.results
    } catch (error) {
      console.log(`error: ${error}`)
      popularMovies.value = []
    } finally {
      isLoading.value = false
    }
  }

  const getUpComingMovies = async (page) => {
    const now = new Date()
    try {
      const res = await axiosInstance.get('/movie/upcoming', {
        params: { language: 'en-US', page },
      })

      const filteredMovies = res.data.results
        .filter((movie) => movie.poster_path && new Date(movie.release_date) > now)
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
      return filteredMovies
    } catch (error) {
      console.log(`error: ${error}`)
      throw error
    }
  }

  const getMovieDetail = async (movieId) => {
    isLoadingDetail.value = true
    try {
      const [movieRes, socialRes, actorsRes] = await Promise.all([
        axiosInstance.get(`/movie/${movieId}`),
        axiosInstance.get(`/movie/${movieId}/external_ids`),
        axiosInstance.get(`/movie/${movieId}/credits`),
      ])
      const actors = actorsRes.data.cast.map((actor) => actor.name)
      selectedMovie.value = { ...movieRes.data, socialNetworkIds: socialRes.data, actors }
    } catch (error) {
      console.error(error)
      selectedMovie.value = {}
    } finally {
      isLoadingDetail.value = false
    }
  }

  const getMoviesByGenre = async (page, genreId) => {
    try {
      const res = await axiosInstance.get('/discover/movie', {
        params: { with_genres: genreId, language: 'en-US', page: page },
      })
      return res.data.results
    } catch (error) {
      console.log(`error: ${error}`)
      return []
    }
  }

  const getMovieTrailer = async (movieId) => {
    try {
      const res = await axiosInstance.get(`/movie/${movieId}/videos`, {
        params: { language: 'en-US' },
      })
      getMovieTrailers.value = res.data.results
    } catch (error) {
      console.log(`error: ${error}`)
      return []
    }
  }

  // TODO：抽象化讓每個 Api fectch function 都可以用
  const fetchAllUpComingMovies = async (maxPage, { type = 'upComing', page = 1, params } = {}) => {
    const typeConfig = {
      upComing: getUpComingMovies,
      genre: getMoviesByGenre,
    }

    const apiFunc = typeConfig[type]

    let movies = []
    isLoading.value = true
    try {
      if (page === 1) upComingMovies.value = []
      while (page <= maxPage) {
        const data = await apiFunc(page, params)
        movies = [...movies, ...data]
        page++
      }
      if (type === 'upComing') upComingMovies.value = movies
      else return movies
    } catch (error) {
      console.log(`error: ${error}`)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isLoadingDetail,
    popularMovies,
    upComingMovies,
    selectedMovie,
    getPopularMovies,
    getMovieDetail,
    fetchAllUpComingMovies,
  }
})

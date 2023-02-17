import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Con este ref validamos no hacer las llamadas al api si es el mismo search del input anterior.
  const previousSearch = useRef(search)

  // El useMemo nos sirve para memorizar o recalcular un valor cada vez que las depencias cambian > es como un computed

  // El useCallback es exactamente igual al useMemo pero especial para retornar una function
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    // Aqui estamos retornando un valor recalculado
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      // localeCompare compara los acentos!
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}

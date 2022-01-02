import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'
// import { useFetch } from '../../hooks/useFetch'
// styles
import './home.css'

// components
import RecipeList from '../../components/RecipeList'
export default function Home() {
  // const { data, isPending, error } = useFetch('http://localhost:3000/recipes')
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore
      .collection('recipes')
      // .get()
      // .then
      // .onSnapshots fires at first render and every time there is a change in the firestore database
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError('No recipes to load')
            setIsPending(false)
            setData([])
          } else {
            let results = []
            snapshot.docs.forEach((doc) => {
              // console.log(doc)
              results.push({ id: doc.id, ...doc.data() })
            })
            setData(results)
            setIsPending(false)
          }
        },
        (err) => {
          setError(err.message)
          setIsPending(false)
        }
      )

    // cleanup function inside useEffect
    return () => unsub()

    // .catch((err) => {
    //   setError(err.message)
    //   setIsPending(false)
    // }) //fetches a snapshot of recipes collection and it is async, returns a promise
  }, [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">...Loading</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

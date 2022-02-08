import { useEffect, useState } from "react"
import { json } from "d3"

export const useData = () => {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  const [data, setData] = useState()
  useEffect(() => {
    json(url).then(data => {
      setData(data)
    })
  }, [])
  return data
}

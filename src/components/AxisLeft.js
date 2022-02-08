import { useEffect, useRef } from "react"
import { select, axisLeft } from "d3"

export const AxisLeft = ({ yScale, innerWidth }) => {
  const yRef = useRef()
  useEffect(() => {
    const yAxisG = select(yRef.current)
    const yAxis = axisLeft(yScale)
    yAxisG.call(yAxis)
  }, [yScale])

  return <g id="y-axis" ref={yRef} />
}

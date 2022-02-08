import { useEffect, useRef } from "react"
import { select, axisBottom } from "d3"

export const AxisBottom = ({ xScale, innerHeight }) => {
  const ref = useRef()
  useEffect(() => {
    const xAxisG = select(ref.current)
    const xAxis = axisBottom(xScale)
    xAxisG.call(xAxis)
  }, [xScale])

  return <g id="x-axis" ref={ref} transform={`translate(0, ${innerHeight})`} />
}

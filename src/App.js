import "./App.css"
import React from "react"
import { scaleTime, scaleLinear, timeFormat, max, min } from "d3"
import { useData } from "./utils/useData"
import { Marks } from "./components/Marks"
import { Tooltip } from "./components/Tooltip"
import { AxisBottom } from "./components/AxisBottom"
import { AxisLeft } from "./components/AxisLeft"

const width = 960
const height = 500
const margin = { top: 20, bottom: 20, left: 40, right: 20 }

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const cleanedData = data.data.map(array => {
    const dateArray = array[0].split("-")
    const year = dateArray[0]
    const month = parseInt(dateArray[1], 10) - 1
    const day = dateArray[2]
    const date = new Date(year, month, day)
    const quarter = Math.floor((date.getMonth() + 3) / 3)
    return { date, value: array[1], quarter }
  })

  const barWidth = innerWidth / cleanedData.length
  const xValue = d => d.date
  const yValue = d => d.value

  const maxDate = max(cleanedData, xValue)
  let newMax = new Date(maxDate)
  newMax.setMonth(newMax.getMonth() + 3)
  const xScale = scaleTime()
    .domain([min(cleanedData, xValue), newMax])
    .range([0, innerWidth])

  const yScale = scaleLinear()
    .domain([0, max(cleanedData, yValue)])
    .range([innerHeight, 0])

  const handleMouseOver = e => {
    e.target.setAttribute("opacity", "0.5")
    const year = e.target.dataset.date.split("-")[0]
    const quarter = e.target.dataset.quarter
    const value = e.target.dataset.gdp
    const x = parseInt(e.target.getAttribute("x") + barWidth) + 75
    const tooltip = document.querySelector("#tooltip")
    tooltip.style.transform = `translateX(${x}px)`
    tooltip.style.opacity = 1
    tooltip.innerHTML = `${year} Q${quarter}<br/> $${value} billion`
    tooltip.dataset.date = e.target.dataset.date
  }

  const handleMouseOut = e => {
    e.target.setAttribute("opacity", "1")
    const tooltip = document.querySelector("#tooltip")
    tooltip.style.opacity = 0
  }

  return (
    <main>
      <div className="svg-wrapper">
        <Tooltip margin={margin} innerHeight={innerHeight} />
        <svg width={width} height={height}>
          <text stroke="black" x={width / 2} y={margin.top + 10} id="title" textAnchor="middle">
            United States GDP 1947 - 2015
          </text>
          <text transform={`translate(${margin.left + 40}, ${innerHeight / 2}) rotate(-90)`} textAnchor="middle">
            Gross Domestic Product
          </text>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
            <Marks data={cleanedData} xScale={xScale} xValue={xValue} yScale={yScale} yValue={yValue} innerWidth={innerWidth} innerHeight={innerHeight} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} barWidth={barWidth} />
          </g>
        </svg>
      </div>
    </main>
  )
}

export default App

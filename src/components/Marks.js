export const Marks = ({ data, xScale, xValue, yScale, yValue, innerWidth, innerHeight, onMouseOver, onMouseOut, barWidth }) => {
  return data.map(dataPoint => <rect onMouseOver={onMouseOver} onMouseOut={onMouseOut} className="bar" key={dataPoint.date} width={barWidth} height={innerHeight - yScale(dataPoint.value)} x={xScale(dataPoint.date)} y={yScale(dataPoint.value)} data-date={dataPoint.date.toISOString().split("T")[0]} data-gdp={dataPoint.value} data-quarter={dataPoint.quarter}></rect>)
}

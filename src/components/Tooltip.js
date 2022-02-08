export const Tooltip = ({ margin, innerHeight }) => {
  return <div data-date id="tooltip" style={{ left: margin.left, opacity: 0, bottom: innerHeight / 4 }} x={0}></div>
}

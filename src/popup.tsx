import { useState } from "react"
import type { PlasmoGetStyle } from "plasmo"

import { stylesString } from "./stylesString"
// If Plasmo's build was working properly (and not crashing) then we would
// no longer need to have a custom build step to build our own CSS string and
// we would replace the above stylesString import with one like this:
// import stylesString from "data-text:./input.css"

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    style.textContent = stylesString
    return style
}

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16
      }}>
      <div className="bg-gray-800 text-red-500 p-4">
          This is content styled with Tailwind with gray background and red text
      </div>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup

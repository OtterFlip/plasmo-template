import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"

import { stylesString } from "../stylesString"
// If Plasmo's build was working properly (and not crashing) then we would
// no longer need to have a custom build step to build our own CSS string and
// we would replace the above stylesString import with one like this:
// import stylesString from "data-text:../input.css"

// Define the CSUI config
export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"],
    all_frames: false
}

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    style.textContent = stylesString
    return style
}


function Content() {


    return (
        <div
            style={{
                padding: 16
            }}>
            <div className="bg-gray-800 text-red-500 p-4">
                This is content styled with Tailwind with gray background and red text
            </div>
        </div>
    )
}

export default Content

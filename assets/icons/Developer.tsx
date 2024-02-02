import clsx from "clsx"
import { memo } from "react"

interface Props {
  width: string
  height: string
  fill: string
}

const Developer = ({ fill, height, width }: Props) => (
  <svg
    fill={fill}
    height={height}
    width={width}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={clsx(`min-w-[${width}] min-h-[${height}]`)}
  >
    <g>
      <g>
        <polygon points="369.182,0 367.59,0 367.59,91.897 459.487,91.897 459.487,90.305 		" />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M328.205,131.282V0H52.513v512h406.974V131.282H328.205z M212.16,312.969l-27.849,27.849l-61.185-61.187l61.185-61.185
        l27.849,27.849l-33.336,33.336L212.16,312.969z M257.329,368.903h-40.246l37.587-178.544h40.247L257.329,368.903z
         M327.689,340.816l-27.849-27.849l33.336-33.336l-33.338-33.338l27.849-27.849l61.187,61.187L327.689,340.816z"
        />
      </g>
    </g>
  </svg>
)

export default memo(Developer)

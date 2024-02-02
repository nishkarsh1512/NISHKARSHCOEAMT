import clsx from "clsx"
import { memo } from "react"

interface Props {
  width: string
  height: string
  fill: string
}

const Monitoring = ({ fill, height, width }: Props) => (
  <svg
    fill={fill}
    height={height}
    width={width}
    version="1.1"
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={clsx(`min-w-[${width}] min-h-[${height}]`)}
  >
    <path
      d="M23,28L23,28c-1.1,0-2.1-0.7-2.5-1.8c0-0.1,0-0.2-0.1-0.2h-8.9c0,0.1,0,0.2-0.1,0.2C11.1,27.3,10.1,28,9,28h0
c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S23.6,28,23,28z"
    />
    <g>
      <path d="M11,13v-2c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3h-2C11.4,14,11,13.6,11,13z" />
      <path
        d="M27,3H5C3.3,3,2,4.3,2,6v15c0,1.7,1.3,3,3,3h6.9h8.1H27c1.7,0,3-1.3,3-3V6C30,4.3,28.7,3,27,3z M16,14c0,2.8-2.2,5-5,5
   s-5-2.2-5-5s2.2-5,5-5c0-0.6,0.4-1,1-1c2.8,0,5,2.2,5,5C17,13.6,16.6,14,16,14z M25,16h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2
   c0.6,0,1,0.4,1,1S25.6,16,25,16z M25,13h-5c-0.6,0-1-0.4-1-1s0.4-1,1-1h5c0.6,0,1,0.4,1,1S25.6,13,25,13z"
      />
    </g>
  </svg>
)

export default memo(Monitoring)

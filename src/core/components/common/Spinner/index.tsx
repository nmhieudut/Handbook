const Spinner = () => {
  return (
    <div className="flex flex-col items-center">
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="150px"
        height="150px"
        viewBox="0 0 150 150"
        enableBackground="new 0 0 150 150"
      >
        <g>
          <path
            fill="#262262"
            d="M61.17,34.403c0,0,22.573,9.213,14.511,33.013C75.681,67.416,99.866,40.545,61.17,34.403z"
          />
          <path
            fill="#262262"
            d="M39.949,50.285c0,0,23.677-5.815,31.144,18.179C71.093,68.464,74.865,32.509,39.949,50.285z"
          />
          <path
            fill="#262262"
            d="M32.116,75.608c0,0,15.737-18.621,35.881-3.599C67.998,72.008,49.915,40.703,32.116,75.608z"
          />
          <path
            fill="#262262"
            d="M40.664,100.698c0,0,1.787-24.315,26.913-24.002C67.577,76.696,34.547,61.998,40.664,100.698z"
          />
          <path
            fill="#262262"
            d="M62.326,115.973c0,0-12.847-20.721,7.665-35.237C69.991,80.735,34.63,88.259,62.326,115.973z"
          />
          <path
            fill="#262262"
            d="M88.83,115.597c0,0-22.573-9.213-14.511-33.013C74.319,82.584,50.134,109.455,88.83,115.597z"
          />
          <path
            fill="#262262"
            d="M110.051,99.715c0,0-23.677,5.815-31.144-18.179C78.907,81.536,75.135,117.491,110.051,99.715z"
          />
          <path
            fill="#262262"
            d="M117.884,74.392c0,0-15.737,18.621-35.881,3.599C82.002,77.992,100.085,109.297,117.884,74.392z"
          />
          <path
            fill="#262262"
            d="M109.336,49.302c0,0-1.787,24.315-26.913,24.002C82.423,73.304,115.453,88.002,109.336,49.302z"
          />
          <path
            fill="#262262"
            d="M87.674,34.027c0,0,12.847,20.721-7.665,35.237C80.009,69.265,115.37,61.741,87.674,34.027z"
          />

          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 75 75"
            to="360 75 75"
            dur="3s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
      <span className="font-semibold">Loading...</span>
    </div>
  )
}

export default Spinner

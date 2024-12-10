import { act, useState } from 'react'

const endPoints = {
  eclipseAuraMainnet: {
    name: 'Eclipse Mainnet',
    uri: 'https://aura-eclipse-mainnet.metaplex.com',
    value: 'eclipseAuraMainnet',
  },
  custom: {
    name: 'Custom',
    uri: 'custom',
    value: 'custom',
  },
}

const EndPointSelector = ({ setActiveEndpoint }) => {
  const [isCustom, setIsCustom] = useState(false)
  const [customEndPoint, setCustomEndPoint] = useState('')

  // read endpoint from local storage

  const handleSelectEndpoint = (e) => {
    console.log(e.target.name)
    if (e.target.name === 'selectEndPoint') {
      if (e.target.value === 'custom') {
        setIsCustom(true)
        const endpoint = localStorage.getItem('customEndPoint') || ''
        console.log(endpoint)
        setActiveEndpoint(endpoint)
        setCustomEndPoint(endpoint)
      } else {
        setIsCustom(false)
        setActiveEndpoint(e.target.value)
      }
    }
    if (e.target.name === 'customEndPoint') {
      console.log(e.target.value)
      setActiveEndpoint(e.target.value)
      setCustomEndPoint(e.target.value)
    }
  }

  return (
    <div className="flex flex-col gap-2 px-1">
      <label
        className="text-sm font-medium text-gray-800 dark:text-neutral-400"
        htmlFor="endPoint"
      >
        End Point
      </label>
      <select
        id="endPoint"
        name="selectEndPoint"
        className="block rounded-lg border border-gray-200 px-2 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:placeholder-neutral-500"
        onChange={(e) => handleSelectEndpoint(e)}
      >
        {Object.entries(endPoints).map(([key, value]) => (
          <option key={key} value={value.uri}>
            {value.name}
          </option>
        ))}
      </select>
      {isCustom && (
        <input
          type="text"
          name="customEndPoint"
          placeholder="https://"
          className="block w-full rounded-lg border border-gray-200 px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:placeholder-neutral-500"
          onChange={(e) => {
            handleSelectEndpoint(e)
            localStorage.setItem('customEndPoint', e.target.value)
          }}
          value={customEndPoint}
        />
      )}
    </div>
  )
}

export default EndPointSelector

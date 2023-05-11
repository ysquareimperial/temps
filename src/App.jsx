import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [location, setLocation] = useState([])
  const [buttonClicked, setButtonClicked] = useState(false)
  const [getData, setGetData] = useState(false)
  const [form, setForm] = useState({
    city_name: '',
    state_code: '',
    country_code: '',
  })
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleButtonClicked = () => {
    setButtonClicked(true)
    setGetData(true)
  }
  useEffect(() => {
    if (buttonClicked && form.city_name) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${form.city_name}&limit=1&appid=8ff7cbea35e22c2b14c791d9d5daff96`,
      )
        .then((response) => response.json())
        .then((data) => setLocation(data))

      console.log('gere')
    }
  }, [buttonClicked])

  useEffect(() => {
    if (getData) {
      console.log('am ready')
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]?.lat}&lon=${location[0]?.lon}&appid=8ff7cbea35e22c2b14c791d9d5daff96`,
      )
        .then((response) => response.json())
        .then((data) => setData(data))
    }
  }, [getData])
  // const lon = location[0].lon
  // const lat = location[0].lat

  return (
    <div>
      {/* {JSON.stringify(form.city_name)} */}
      {JSON.stringify(location)}
      {JSON.stringify(data)}
      <input
        name="city_name"
        placeholder="City name"
        value={form.city_name}
        onChange={handleChange}
      />
      <input
        name="state_code"
        value={form.state_code}
        onChange={handleChange}
      />
      <input
        name="country_code"
        value={form.country_code}
        onChange={handleChange}
      />
      <button onClick={handleButtonClicked}>Submit</button>
    </div>
  )
}

export default App

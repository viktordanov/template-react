import React, { useState, useEffect, ReactElement } from 'react'
import './App.module.scss'

interface Props {}

const App: React.FunctionComponent<Props> = (): ReactElement => {
	const [state, setState] = useState({
		date: Date.now(),
		counter: 0,
	})

	useEffect(() => {
		const id = setInterval(() => {
			setState(state => ({ ...state, date: Date.now() }))
		}, 100)
		return () => clearInterval(id)
	}, [])

	return (
		<div className="App">
			<h1>{`Hello, world ${state.date}`}</h1>
			<p>{state.date}</p>
			<p>{state.counter}</p>
			<button
				onClick={() =>
					setState(state => ({ ...state, counter: state.counter + 1 }))
				}
			>
				Increment
			</button>
		</div>
	)
}

export default App

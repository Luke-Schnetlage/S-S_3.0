export default function Active ({ setGameState }) {
  return (
    <div className='center-align'>
      <h1>Post-Game</h1>
      <div>
        <button onClick={() => setGameState('pre')}>Advance to Game</button>
      </div>
    </div>
  )
}

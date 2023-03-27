export default function Active({setGameState}){
    return(
        <div className="center-align">            
            <h1>Active-Game</h1>
            <div>
                <button onClick={() => setGameState("post")}>Advance to Post</button>
            </div>
            <div>
                <button onClick={() => setGameState("pre")}>Retreat to Pre</button>
            </div>
        </div>
    );    
}
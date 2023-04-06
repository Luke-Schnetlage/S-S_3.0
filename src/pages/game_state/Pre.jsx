export default function Pre({setGameState}){
    return(
        <div className="center-align">            
            <h1>Pre-Game</h1>
            <div>
                <div className="active-users">
                  
                </div>
                <button onClick={() => setGameState("active")}>Advance to Active</button>
            </div>
        </div>
    );    
}
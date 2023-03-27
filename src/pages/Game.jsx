import Pre from "./game_state/Pre"
import Active from "./game_state/Active"
import Post from "./game_state/Post"
import React, { useState } from "react";

export default function Game(){
const [gameState, setGameState] = useState("pre")
    //if the user is logged in, allow them to play
    if(localStorage.getItem("user")){
        console.log(localStorage)
        

        if(gameState === "pre"){
            return(
                <div className="center-align">            
                    <Pre setGameState={setGameState}/>
                </div>
            );
        }

        if(gameState === "active"){
            return(
                <div className="center-align">            
                    <Active setGameState={setGameState}/>
                </div>
            );
        }

        if(gameState === "post"){
            return(
                <div className="center-align">            
                    <Post setGameState={setGameState}/>
                </div>
            );
        }
        
    }
    return(
        <div className="center-align">            
            <h1>Please log in to play</h1>
        </div>
    )
    
}
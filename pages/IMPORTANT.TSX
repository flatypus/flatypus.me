import { useState, useEffect } from "react"

export default function Tristan(){
	const [ready, setReady] = useState(true)
	useEffect(()=>{
	setTimeout(()=>{setReady(false)},3000)
},[])
	return ready ? <div className="text-7xl w-screen h-screen grid place-items-center">TURN AROUND!</div> : <div className="w-screen h-screen grid place-items-center"><img className="w-full h-full" src="https://imgs.search.brave.com/JleyxkIKQHs5bVAnWcid2kkcD4Oz8V5GXn9oYxQ0d0M/rs:fit:540:405:1/g:ce/aHR0cHM6Ly9tZWRp/YS5naXBoeS5jb20v/bWVkaWEvNWtxMEdD/akhBOFJ3Yy9naXBo/eS5naWY.gif"></img></div>


}

//  Recrate the html in Js

var positions=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,1],
    [1,2,1,2,2,1,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,1],
    [1,2,1,2,2,1,2,2,1,2,2,2,1,2,2,2,2,1,1,1,2,2,1],
    [1,2,1,2,2,1,2,2,1,2,2,2,1,2,2,2,2,1,2,2,2,2,1],
    [1,2,1,2,2,1,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

const displayHtml=()=>{
    var output='';
    for(let i=0;i<positions.length;i++){
        output+="<div id='row'>\n";
        for(let j=0;j<positions[i].length;j++){
            if(positions[i][j]===1){
                output+="<div class='block'></div>";
            }
            else if(positions[i][j]===2){
                output+="<div class='coin'></div>";
            }
            else if(positions[i][j]===0){
                output+="<div class='empty'></div>"

            }
        }
        output+="</div>";
    }

    return document.getElementById('main').innerHTML = output ;
}


const pacFig=document.querySelector(".pacman")
let posVerHor={
    x:1,
    y:1
}
let displayNumPos=()=>{
    pacFig.style.top=posVerHor.y * 30 + "px";
    pacFig.style.left=posVerHor.x * 30 + "px";
}



///Ghost Features 
const ghost=document.querySelector(".ghost");
let ghostPos={
    x:10,
    y:6
}

let displayGhost=()=>{
    ghost.style.top=(ghostPos.y) * 30 +"px"
    ghost.style.left =(ghostPos.x)* 30+"px"
};


displayGhost();
displayHtml();
let score=0;

document.onkeydown=(e)=>{
    if (e.keyCode === 40 && positions[posVerHor.y+1][posVerHor.x]!==1) { // Arrow down key
        posVerHor.y++;
        
    } else if (e.keyCode === 38&& positions[posVerHor.y-1][posVerHor.x]!==1) { // Arrow up key
        posVerHor.y--;
        
    } else if (e.keyCode === 37 && positions[posVerHor.y][posVerHor.x-1]!==1) { // Arrow left key
        posVerHor.x--;
        
    } else if (e.keyCode === 39 && positions[posVerHor.y][posVerHor.x+1]!==1) { // Arrow right key
        posVerHor.x++;
        
    }
    if(positions[posVerHor.y][posVerHor.x]==2){
        positions[posVerHor.y][posVerHor.x]=0;
        score+=50;
        document.querySelector(".score h1").innerHTML = score ;
    
    }
    displayNumPos();
    displayHtml();
    overlapingImg();
}

let overlapingImg=()=>{
    if(posVerHor.x===ghostPos.x && posVerHor.y===ghostPos.y){
        alert(`Game over your score is ${score}!`);
    }
    else{

    }
}
overlapingImg();

let moveGhostRandomly = () => {
    const possibleMoves = [
        { dx: 1, dy: 0 }, // Right
        { dx: -1, dy: 0 }, // Left
        { dx: 0, dy: 1 }, // Down
        { dx: 0, dy: -1 } // Up
    ];

    let validMoves = [];

    for (let move of possibleMoves) {
        let newX = ghostPos.x + move.dx;
        let newY = ghostPos.y + move.dy;

        if (newX >= 0 && newX < positions[0].length && newY >= 0 && newY < positions.length && positions[newY][newX] !== 1) {
            validMoves.push(move);
        }
    }

    if (validMoves.length > 0) {
        let randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        ghostPos.x += randomMove.dx;
        ghostPos.y += randomMove.dy;
        displayGhost();
        overlapingImg();
    }
};

// Call moveGhostRandomly every 1 second
setInterval(moveGhostRandomly, 1000);





///Features 
//1.Display HTml
//2.Make it move with key
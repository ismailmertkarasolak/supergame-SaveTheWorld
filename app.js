const screen= document.querySelector(".screen")
const resultsDisplay = document.querySelector(".results")
let currentSpaceshipIndex = 178
let width = 17
let meteorid
let rocksRemoved =[]
let direction=1
let results = 0
let goingRight = true




for (let i = 0; i<221; i++) {
    const square = document.createElement("div")
    screen.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".screen div"))

const meteors = [
    0,1,2,5,6,7,8,10,11,12,
    17,18,19,22,23,24,25,27,28,29
    
]

function draw() {
    for (let  i = 0; i < meteors.length; i++) {
        if(!rocksRemoved.includes(i)) {
            squares[meteors[i]].classList.add("rock")   
        }
            
    }
}

draw()

function remove() {
    for (let  i = 0; i < meteors.length; i++) {
        squares[meteors[i]].classList.remove("rock")       
    }
}

squares[currentSpaceshipIndex].classList.add("spaceship")

function moveship(e){
    squares[currentSpaceshipIndex].classList.remove("spaceship")
    switch(e.key) {
        case "ArrowLeft":
            if (currentSpaceshipIndex % width !==0) currentSpaceshipIndex -=1
            break
        case "ArrowRight":
            if (currentSpaceshipIndex % width < width -1) currentSpaceshipIndex +=1
            break 
    }
    squares[currentSpaceshipIndex].classList.add("spaceship")
 
}
document.addEventListener("keydown", moveship)

function movemeteor() {
    const leftEdge = meteors[0] % width ===0
    const rightEdge = meteors[meteors.length -1] % width === width -1
    remove()


    if (rightEdge && goingRight) {
        for (let i = 0; i<meteors.length; i++){
            meteors[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight){
        for (let i=0; i < meteors.length; i++){
            meteors[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    for(let i = 0; i< meteors.length; i++) {
        meteors[i] += direction
    }

    draw()

    if (squares[currentSpaceshipIndex].classList.contains("rock","spaceship")){
        resultsDisplay.innerHTML="GAME OVER"
        clearInterval(meteorid)
    }
    for(let i = 0; i < meteors.length; i++){
        if (meteors[i] > (squares.length)) {
            resultsDisplay.innerHTML = "GAME OVER"
            clearInterval(meteorid)
        }
    }
    if (rocksRemoved.length === meteors.length){
        resultsDisplay.innerHTML = "YOU WİN!! YUPPİİİ"
        clearInterval(meteorid)
    }
}
meteorid = setInterval(movemeteor,400)

function attack(e) {
    let bulletid
    let currentBulletIndex = currentSpaceshipIndex
    function moveBullet(){
        squares[currentBulletIndex].classList.remove("bullet")
        currentBulletIndex -= width
        squares[currentBulletIndex].classList.add("bullet")

        if (squares[currentBulletIndex].classList.contains("rock")){
            squares[currentBulletIndex].classList.remove("bullet")
            squares[currentBulletIndex].classList.remove("rock")
            squares[currentBulletIndex].classList.add("bum")

            setTimeout(()=>squares[currentBulletIndex].classList.remove("bum"),300)
            clearInterval(bulletid)

            const rockRemovedIndex = meteors.indexOf(currentBulletIndex);
            rocksRemoved.push(rockRemovedIndex);
            results++
            resultsDisplay.innerHTML = results
            console.log(rocksRemoved);


        }

    }
    switch(e.key) {
        case "ArrowUp":
            bulletid = setInterval(moveBullet,100)

    }


}
document.addEventListener("keydown", attack)
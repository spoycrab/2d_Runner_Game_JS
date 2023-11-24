
class EndlessRunnerGame {
    constructor(id, frameRate, groundOffset, playerOptions, spawnerOptions, difficulty, cenario,floorImage,wallImage) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.frameRate = frameRate;
        this.groundY = this.canvas.height - groundOffset;
        this.playerOptions = playerOptions;
        this.spawnerOptions = spawnerOptions;
        this.difficulty = difficulty;
        this.cenario = cenario;
        this.floorImage = floorImage;
        this.wallImage = wallImage;
        this.initialize();
    }

    // A method used to initialize the game.
    initialize() {
        // this.background = new Background(255, this.canvas.width, this.canvas.height);
        this.floorX = 0;
        this.player = Player.create(playerOptions, this.groundY);
        this.cenario = Cenario.create(cenario,this.canvas.width, this.groundY); 
        this.spawner = Spawner.create(spawnerOptions, this.canvas.width, this.groundY);
        this.floor = Floor.create(this.floorX,this.groundY,this.spawner.speed,this.floorImage);
        this.wall = Floor.create(this.floorX,this.groundY - 28,this.spawner.speed,this.wallImage);
        // this.wall = Floor.create(this.floorX,this.groundY - this.floorImage.height,this.spawner.speed,this.wallImage);
        this.speed = 0;
        this.score = 0;
        this.ctx.font = "30px Fantasy"
        this.gameOver = false;

    }

    // A method used to start the game.
    start() {
        
        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('mousedown',this.keydown.bind(this));

        canvas.addEventListener("mousemove", this.showMousePosition);//debug


        setInterval(this.loop.bind(this), this.frameRate);
    }

    // A method used to execute the game's keydown events.
    keydown(event) {
        console.log(event);
        if (event.code == 'Space' || event.code == 'ArrowUp' || event.type == 'mousedown') {
            // If the game is ended,
            // restart the game.
            if (this.gameOver)
                this.initialize();
            // otherwise, execute the 
            // player's jump behaviour.
            else
                this.player.jump();
        }
    }


    // A method used to execute the game's continuous behaviour.
    loop() {
        // Clear the canvas.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw game objects
        // this.background.draw(this.ctx);
        this.cenario.draw(this.ctx);
        this.wall.draw(this.ctx);
        this.spawner.draw(this.ctx);
        this.player.draw(this.ctx);
        this.floor.draw(this.ctx);
        
        this.drawScore();
        // If the game is ended.
        if (this.gameOver) {
            // Draw game over elements.
            this.drawGameOver();

            // otherwise, execute game behaviour.
        } else {
            // Increase difficulty. 
            this.increaseDifficulty();

            // Execute update.
            // this.background.update();
            this.player.update();
            this.wall.update();
            this.spawner.update();
            this.cenario.update();
            this.floor.update();
            // Check for collisions.
            this.gameOver = this.player.overlapsWithOthers(this.spawner.activeObstacles);

            // Increase score.
            this.score++;
        }
        

    }

    // A method used to increase the game's difficulty.
    increaseDifficulty() {
        if (this.speed < this.difficulty.maxIncreasement) {
            this.speed += this.difficulty.speedIncreasement;
            this.player.movement.jumpPower += this.difficulty.speedIncreasement;
            this.player.movement.gravity += this.difficulty.speedIncreasement;
            this.spawner.speed += this.difficulty.speedIncreasement;
            this.floor.speed += this.difficulty.speedIncreasement;
            this.wall.speed += this.difficulty.speedIncreasement;

        }
    }

    // A method used to draw the game over text
    // if the game ends.
    drawGameOver() {
        this.ctx.beginPath();
        this.ctx.fillText("GAMEOVER", this.canvas.width / 2-50, this.canvas.height / 2);
        this.ctx.closePath();
    }

    // A method used to draw the game's score.
    drawScore() {
        this.ctx.beginPath();
        this.ctx.fillText("Pontos: " + this.score, 10, 40);
        this.ctx.closePath();
    }
    
    //desenhar o chao no canvas
    // drawFloorImage(){
    //     //imagem 1
    //     this.ctx.drawImage(this.floorImage,this.floorX,this.groundY);
    //     //imagem 2
    //     this.ctx.drawImage(this.floorImage,this.floorX + this.floorImage.width ,this.groundY)
    // }
    //mover as imagens do canvas na velocidade dos obstaculos
    // updateFloor(){
    //     this.floorX-= this.spawner.speed
    //     if (this.floorX <= -floorImage.width) {
    //         this.floorX = 0;
    //     }
    // }
    //floorX,groundY,speed,image
    
    // A method used to draw the scene's ground.
    drawGround() {
        this.ctx.beginPath();
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 100);  
        this.ctx.fill();
        this.ctx.closePath();
    }
}
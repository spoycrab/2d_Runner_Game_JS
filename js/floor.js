class Floor {
    constructor(floorX,groundY,speed,floorImage) {
        this.floorX = floorX;
        this.groundY = groundY;
        this.floorImage = floorImage;
        this.speed = speed;

    }
    //Desenha uma imagem atras da outra
    draw(ctx) {
        //imagem 1
        ctx.drawImage(this.floorImage,this.floorX,this.groundY);
        //imagem 2
        ctx.drawImage(this.floorImage,this.floorX + this.floorImage.width ,this.groundY);
        //imagem 3
        ctx.drawImage(this.floorImage,this.floorX + 2*this.floorImage.width ,this.groundY);
    }

    update(){
        this.floorX-= this.speed;

        if (this.floorX <= -floorImage.width) {
            this.floorX = 0;
        }
    }

    static create(floorX,groundY,speed,floorImage) {
        
        return new Floor(floorX,groundY,speed,floorImage);
    }
    
}
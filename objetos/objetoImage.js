class ObjetoImage {
    constructor(position, image, w, h,area) {
        this.position = position;
        this.image = image;
        this.w = w;
        this.h = h;
        this.area = area;// sky, ground
    }

    draw(ctx) {

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.w,
            this.h
        );
    }
    static create(x, y, w, h, image, area) {
        const position = new Point2D(x, y);
        return new ObjetoImage(position, image, w, h,area);
    }
}

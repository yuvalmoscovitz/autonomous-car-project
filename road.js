class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.laneWidth = this.width/this.laneWidth;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 +
            Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }

    getLanesXCoordinates() {
        const lanesX = [];
        for (let i = 0; i <= this.laneCount; i++) {
            lanesX[i] = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
        }
        return lanesX;
    }

    getLanesLines() {
        const lanesX = this.getLanesXCoordinates();
        const lanesLines = [];
        for (let i = 0; i <= lanesX.count; i++) {
            const start = ({
                x: lanesX[i],
                y: this.bottom
            })
            const end = ({
                x: lanesX[i],
                y: this.top
            })
            const oneLaneLine = [start, end];
            lanesLines.push(oneLaneLine);
        }
        return lanesLines;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        const lanesX = this.getLanesXCoordinates();
        for (let i = 1; i <= this.laneCount - 1; i++) {
            const x = lanesX[i];

            ctx.setLineDash([30, 33]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.strokeStyle = "gold";
        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}

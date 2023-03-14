class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3,color = "black") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.color = color;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.maxReverseSpeed = -this.maxSpeed / 2;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;

        this.useBrain = controlType == "AI";

        if (controlType != "DUMMY") {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork(
                [this.sensor.rayCount, 6, 4]
            );
        }
        this.controls = new Controls(controlType);
    }


    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(
                roadBorders, traffic);
        }

        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
            const offsets = this.sensor.readings.map(
                s => s == null ? 0 : 1 - s.offset
            );
            const outputs = NeuralNetwork.feedForward(
                offsets, this.brain);

            if (this.useBrain) {
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }
    }

    #assessDamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polysIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }

        return false;
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);

        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });

        return points;
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < this.maxReverseSpeed) {
            this.speed = this.maxReverseSpeed;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

    }

    isAfterTraffic(traffic) {
        for (let i = 0; i < traffic.length; i++) {
            if (traffic[i].y < bestCar.y + 1000) {
                return false;
            }
        }
        return true;
    }

    isInLane(road) {
        for (let i = 1; i < road.laneCount - 1; i++) {
            const leftDashedLineX =
                (road.getLaneCenter(i - 1) + road.getLaneCenter(i)) / 2;
            const rightDashedLineX =
                (road.getLaneCenter(i) + road.getLaneCenter(i + 1)) / 2;

            if (leftDashedLineX > (this.x - this.width / 2) &&
                leftDashedLineX < this.x) {
                return false;
            }
            if (leftDashedLineX > this.x &&
                leftDashedLineX < this.x + this.width / 2) {
                return false;
            }
            if (rightDashedLineX > this.x &&
                rightDashedLineX < this.x + this.width / 2) {
                return false;
            }
            if (rightDashedLineX > (this.x - this.width / 2) &&
                rightDashedLineX < this.x) {
                return false;
            }
        }
        return true;
    }

    isVibrating(x) {
        if (this.x != x){
            return true;
        }
        return false;
    }

    improvePerformance (traffic, road, x,percentage){
        if (this.isAfterTraffic(traffic)) {
            if (!this.isInLane(road)) {
                NeuralNetwork.updateBiases(this.brain, percentage);
            }
            if (this.isVibrating(x)){
                NeuralNetwork.updateBiases(this.brain, percentage);
            } 
        }
    }
    draw(ctx, color, drawSensor = false) {
        if (this.damaged) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = color;
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        if (this.sensor && drawSensor) {
            this.sensor.draw(ctx);
        }
    }
}


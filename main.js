const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 285;
const carCtx = carCanvas.getContext("2d");

const carMovementCanvas = document.getElementById("carMovementCanvas");
carMovementCanvas.width = 250;
carMovementCanvas.height = 80;
carMovementCanvas.style = style = "border:0px solid #d3d3d3;position:absolute; top: 0; left: 0;";
const carMovementCtx = carMovementCanvas.getContext("2d");
CarMovement.init(carMovementCtx);

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.85);

const N = 1;
const cars = generateCars(N);
const mutate = 0.005;
var bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, mutate);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -400, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(2), -400, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -600, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -880, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -900, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(2), -1300, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(2), -1300, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(2), -1500, 55, 70, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -1600, 58, 75, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -2000, 58, 75, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -2200, 58, 75, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -2250, 58, 75, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -2400, 58, 75, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -2570, 60, 84, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -2800, 60, 90, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -2570, 60, 90, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -2900, 60, 88, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(0), -3100, 62, 100, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(2), -3300, 53, 60, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(1), -3600, 55, 72, "DUMMY", 2, "orange"),
    new Car(road.getLaneCenter(2), -3900, 55, 75, "DUMMY", 2, "orange"),
];

let stop = false;

animate();

function saveBrain() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function confirm() {
    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        text = "You pressed OK!";
    } else {
        text = "You canceled!";
    }
    document.getElementById("demo").innerHTML = text;
}

function discardBrain() {
    localStorage.removeItem("bestBrain");
}

function stopSimulation() {
    stop = true;
}

function generateCars(N) {
    const cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 55, 70, "AI"));
    }
    return cars;
}

function animate(time) {
    if (stop) {
        return false;
    }

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);

        const x = cars[i].x
        cars[i].improvePerformance(traffic, road, x, 10);
    }
    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        )
    );
    carCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, traffic[i].color);
    }

    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;

    bestCar.draw(carCtx, "darkblue", true);

    carCtx.restore();

    CarMovement.update(carMovementCtx, bestCar.brain);

    requestAnimationFrame(animate);
}


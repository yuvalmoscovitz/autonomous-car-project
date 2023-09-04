# 🚗 Sensor-Equipped Autonomous Car Simulation 

This project is a web-based simulation that showcases a sensor-led car with fundamental car mechanics. The core feature of this simulation is its connection to a rudimentary neural network, built from scratch without the use of any libraries. The primary objective was to train the car model, equipped with sensors, to skillfully maneuver through traffic.

## 🌟 Features 🌟

- **🖥️ HTML Car Simulation with Sensors**: A simple representation of a car equipped with sensors to detect its surroundings. Users can observe the car's behavior in real-time as it interacts with the environment.
  
- **🧠 Custom Neural Network**: A neural network built from the ground up, without relying on any external libraries or frameworks 🚫📚. This network is composed of multiple levels, each with its own set of weights and biases, enabling complex decision-making processes.
  
- **🚦 Traffic Maneuver Training**: The neural network is trained to guide the sensor-led car in navigating through traffic, ensuring safe and efficient travel. The AI-controlled car learns to navigate in a simulated environment filled with dummy traffic cars, providing a realistic scenario for the car to hone its maneuvering skills.
  
- **⚙️ Dynamic Neural Network Adjustments**: The neural network's biases are dynamically adjusted based on the car's performance, ensuring continuous improvement in its behavior.
  
- **📡 Sophisticated Sensing Mechanism**: The car is equipped with a sensor that uses ray-casting to detect its surroundings. This mechanism casts multiple rays around the car, determining intersections with road borders and other vehicles. This sensory data is vital for the neural network's decision-making process.

## 🛠️ How It Works 🛠️

1. **🚗 Car Mechanics and Sensors**: The HTML app provides a visual representation of the car, its sensors, and its surroundings. The sensors detect obstacles, other vehicles, and road conditions, sending this data to the neural network.
  
2. **🧠 Neural Network**: The custom-built neural network processes the data from the car's sensors and makes decisions on how the car should move. This includes accelerating, decelerating, and changing lanes to avoid traffic.
  
3. **🎓 Training**: The car is trained in a simulated environment with varying traffic conditions. Over time, the neural network adapts and improves its decision-making to ensure the car can smoothly navigate through traffic using its sensors.

## 💾 Loading the Saved Brain 💾

The trained neural network, or the "brain" 🧠 of the car, can be saved to the browser's local storage 💻. To load the saved brain:

- Ensure that the `bestBrain` key 🔑 exists in your browser's local storage 💾.
- The JavaScript code will automatically fetch this key and initialize the car's brain using the saved neural network configuration.
- If you wish to discard the saved brain, simply remove the `bestBrain` key from local storage.
- [🔗 Access my bestBrain.json file directly from the repository here](https://github.com/yuvalmoscovitz/autonomous-car-project/blob/main/bestBrain.json).

## 🚀 Getting Started 🚀

1. Clone the repository to your local machine 💻.
2. Open the `index.html` file in your preferred web browser.
3. Interact with the simulation using the provided controls. You can save the neural network's state, discard it, or stop the simulation as needed.
4. Observe the car's behavior as it uses its sensors and the trained neural network to maneuver through traffic.

## Future Improvements 

- Enhance the visual representation of the car, its sensors, and traffic for a more immersive experience.
- Introduce more complex traffic scenarios and sensor challenges to further refine the neural network's capabilities.
- Explore the possibility of integrating more advanced neural network architectures and sensor technologies for improved performance 📈.

---

🚗💨 Enjoy watching the sensor-led car navigate its way and feel the magic of a neural network in action! 

# UrbanFlow AI: Multi-Agent Reinforcement Learning (MARL) Logistics Simulator 🚄🤖

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://YOUR-VERCEL-LINK-HERE.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Framer%20Motion-blue)](#)

## 📌 Overview
**UrbanFlow AI** is a high-fidelity simulation environment designed to optimize autonomous logistics in dense urban environments. The system utilizes **Multi-Agent Reinforcement Learning (MARL)** to coordinate dozens of delivery units, ensuring collision-free navigation and minimal latency.

This project bridges the gap between complex AI research and intuitive data visualization, providing a mission-control interface for decentralized fleet management.

## 🧠 Core AI Concepts
The simulation is built upon the **Centralized Training, Decentralized Execution (CTDE)** framework, utilizing a **Proximal Policy Optimization (PPO)** approach for agent decision-making.

### The Reward Function
To ensure optimal behavior, each agent operates based on a multi-objective reward function $R$:
$$R = \sum (D_{success} \times 10) - (C_{collision} \times 50) - (L_{latency} \times 0.1)$$
Where:
* $D_{success}$: Successful deliveries.
* $C_{collision}$: Penalty for agent-to-agent or agent-to-environment conflict.
* $L_{latency}$: Cost of time and computational energy.

## 🛠 Features
* **Real-time Pathfinding:** Dynamic trajectory recalculation using A* search integrated with neural network policy outputs.
* **Scenario Intelligence:** Stress-test the system with "Peak Congestion" and "Emergency Rerouting" (blocking intersections in real-time).
* **Deep Telemetry:** Individual asset tracking (UUID, Confidence Score, Battery Life, and Task Queue).
* **Enterprise UI:** Minimalist, high-density dashboard built with Shadcn UI and Radix primitives.

## 🏗 Technical Architecture
1.  **Simulation Engine:** A stochastic discrete-event simulator running on the frontend (React State).
2.  **Perception Layer:** Agents process local observations (State Space) from a 20x20 grid.
3.  **Analytics Pipeline:** Real-time data streaming into Recharts for throughput and network health visualization.

## 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/urban-flow-ai.git](https://github.com/YOUR_USERNAME/urban-flow-ai.git)
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
👨‍💻 Author
Rafael Ibayev

Computer Science Student at ELTE University, Budapest.

International STEM Olympiad Gold Medalist.

Interested in Robotics, AI Safety, and High-Performance Systems.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

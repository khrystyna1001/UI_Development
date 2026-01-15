# FarmConnect 🚜

**FarmConnect** is a specialized mobile marketplace application designed to bridge the gap between local farmers and consumers. By leveraging a modern tech stack, it provides a seamless platform for purchasing fresh produce, accessing agricultural insights, and direct communication.

## 🌟 Key Features
* **Direct Marketplace:** Browse and purchase fresh farm produce directly from the source.
* **Informative Blog:** Stay updated with agricultural trends and farming tips.
* **Messaging System:** Real-time engagement between buyers and farmers.
* **Task Automation:** Efficient background processing for notifications and data management.

## 🛠️ Tech Stack
| Layer          | Technology       |
|----------------|------------------|
| **Frontend** | React Native     |
| **Backend** | Django (DRF)     |
| **Worker** | Celery           |
| **Broker** | Redis / RabbitMQ |
| **Database** | PostgreSQL       |
| **DevOps** | Docker Compose   |

## Getting Started

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
* Node.js & npm (for local frontend development).

### Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/khrystyna1001/UI_Development.git](https://github.com/khrystyna1001/UI_Development.git)
   cd UI_Development
   cd FarmConnect
   docker compose up --build

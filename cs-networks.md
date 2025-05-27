# Networking

## MAC addresses

Each network interface has a unique MAC address. This is a 48-bit number that is used to identify the device on the network. The MAC address is usually represented as six pairs of hexadecimal digits, separated by colons or hyphens. For example, `00:1A:2B:3C:4D:5E`.

## IP addresses

An IP address is a unique identifier for a device on a network. It is used to route packets of data between devices. There are two versions of IP addresses: IPv4 and IPv6.

### IPv4

IPv4 addresses are 32-bit numbers, usually represented as four decimal numbers separated by dots. For example, `192.168.1.101`. Each number can range from 0 to 255. IPv4 addresses are running out, so IPv6 was introduced.

### IPv6

IPv6 addresses are 128-bit numbers, usually represented as eight groups of four hexadecimal digits separated by colons. For example, `2001:0db8:85a3:0000:0000:8a2e:0370:7334`. IPv6 addresses are much larger than IPv4 addresses, so they can accommodate many more devices on the internet.

## Allocation of IP addresses

IP addresses are allocated by the Internet Assigned Numbers Authority (IANA) and its regional registries. There are three main types of IP address allocation:

1. **Public IP addresses**: These are unique addresses that are routable on the internet. They are assigned to devices that need to be accessible from outside the local network.
2. **Private IP addresses**: These are non-routable addresses that are used within a local network. They are not unique and can be reused in different networks.

## Subnetting

Subnetting is the process of dividing a larger network into smaller, more manageable sub-networks (subnets). This allows for better organization and management of IP addresses. Subnetting is done by borrowing bits from the host portion of the IP address to create additional network bits.

Example subnetting:

A Class A address has a default subnet mask of `255.0.0.0`. For example, the IP address `10.0.0.0` with a subnet mask of `255.255.255.0` can be divided into smaller subnets:

- Subnet 1: `10.0.0.0/24` (Range: `10.0.0.1` to `10.0.0.254`)
- Subnet 2: `10.0.1.0/24` (Range: `10.0.1.1` to `10.0.1.254`)
- Subnet 3: `10.0.2.0/24` (Range: `10.0.2.1` to `10.0.2.254`)

This allows for better utilization of IP addresses and improved network segmentation.

## CIDR notation

CIDR (Classless Inter-Domain Routing) notation is a way to represent IP addresses and their associated network masks. It uses a slash (/) followed by the number of bits in the subnet mask. For example, `192.168.1.0/24` indicates that the first 24 bits are used for the network portion, leaving the remaining bits for host addresses.

### Example of CIDR Notation

- `192.168.1.0/24`: Network range is `192.168.1.1` to `192.168.1.254`, with a subnet mask of `255.255.255.0`.
- `10.0.0.0/8`: Network range is `10.0.0.1` to `10.255.255.254`, with a subnet mask of `255.0.0.0`.
- `172.16.0.0/16`: Network range is `172.16.0.1` to `172.16.255.254`, with a subnet mask of `255.255.0.0`.

CIDR allows for more efficient allocation of IP addresses compared to the traditional class-based system.

## OSI seven-layer model

The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and implement network protocols. It consists of seven layers, each with its own specific functions:

1. **Physical Layer**: Deals with the physical connection between devices, including cables, switches, and electrical signals.
2. **Data Link Layer**: Responsible for node-to-node data transfer and error detection/correction. It includes protocols like Ethernet and Wi-Fi.
3. **Network Layer**: Manages routing and forwarding of packets across networks. It includes protocols like IP (Internet Protocol).
4. **Transport Layer**: Ensures reliable data transfer between devices. It includes protocols like TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).
5. **Session Layer**: Manages sessions between applications, including establishing, maintaining, and terminating connections.
6. **Presentation Layer**: Translates data between the application layer and the network. It includes data encryption, compression, and formatting.
7. **Application Layer**: Provides network services to end-user applications. It includes protocols like HTTP, FTP, and SMTP.

The OSI model helps in understanding how different protocols interact and work together to enable communication over a network.

## TCP/IP model

The TCP/IP (Transmission Control Protocol/Internet Protocol) model is a simplified version of the OSI model, consisting of four layers:

1. **Link Layer**: Corresponds to the OSI Physical and Data Link layers. It deals with the physical connection and data transfer between devices.
2. **Internet Layer**: Corresponds to the OSI Network layer. It manages routing and forwarding of packets across networks using IP.
3. **Transport Layer**: Corresponds to the OSI Transport layer. It ensures reliable data transfer between devices using protocols like TCP and UDP.
4. **Application Layer**: Corresponds to the OSI Session, Presentation, and Application layers. It provides network services to end-user applications using various protocols.

## Networking exercises using Docker Compose

### Exercise 1: Basic Networking with Docker Compose

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - '8080:80'
    networks:
      - my_network

  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks:
      - my_network
networks:
  my_network:
    driver: bridge
```

This Docker Compose file creates a simple web server using Nginx and a MySQL database. Both services are connected to a custom bridge network called `my_network`. The web server is accessible on port 8080 of the host machine.

### Exercise 2: Multi-Container Application with Networking

```yaml
version: '3'
services:
  frontend:
    image: nginx
    ports:
      - '8080:80'
    networks:
      - frontend_network

  backend:
    image: node
    networks:
      - backend_network

  database:
    image: postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    networks:
      - backend_network
networks:
  frontend_network:
    driver: bridge
  backend_network:
    driver: bridge
```

This Docker Compose file creates a multi-container application with a frontend (Nginx), backend (Node.js), and a PostgreSQL database. The frontend is connected to a separate network (`frontend_network`), while the backend and database share the `backend_network`. This setup allows for better isolation and communication between services.

### Exercise 3: Service Discovery with Docker Compose

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - '8080:80'
    networks:
      - my_network

  api:
    image: node
    networks:
      - my_network

  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks:
      - my_network
networks:
  my_network:
    driver: overlay
```

This Docker Compose file creates a multi-container application with Nginx, Node.js, and MySQL. All services are connected to an overlay network called `my_network`. This allows for service discovery and communication between containers across different hosts in a Docker Swarm cluster.

### Exercise 4: Load Balancing with Docker Compose

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - '8080:80'
    networks:
      - my_network

  api:
    image: node
    networks:
      - my_network

  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks:
      - my_network

  load_balancer:
    image: nginx
    ports:
      - '80:80'
    networks:
      - my_network
    depends_on:
      - web
      - api
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
networks:
  my_network:
    driver: bridge
```

This Docker Compose file creates a multi-container application with Nginx, Node.js, MySQL, and a load balancer. The load balancer is configured to distribute traffic between the web and API services. The Nginx configuration file (`nginx.conf`) should be created to define the load balancing rules.

### Exercise 5: Network Security with Docker Compose

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - '8080:80'
    networks:
      - my_network

  api:
    image: node
    networks:
      - my_network

  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks:
      - my_network

  firewall:
    image: alpine
    command: ['sh', '-c', 'while true; do sleep 30; done;']
    networks:
      - my_network
    depends_on:
      - web
      - api
      - db
networks:
  my_network:
    driver: bridge
```

This Docker Compose file creates a multi-container application with Nginx, Node.js, MySQL, and a firewall. The firewall service is a placeholder that can be configured to implement security rules for the network. You can use tools like `iptables` or `ufw` to manage firewall rules within the container.

### Exercise 7: Advanced Networking with Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    image: nginx:latest
    networks:
      - frontend_net
    ports:
      - '80:80'

  backend:
    image: node:18-alpine
    networks:
      - backend_net
    environment:
      - DATABASE_URL=postgres://db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    networks:
      - backend_net
    volumes:
      - db_data:/var/lib/postgresql/data

  monitoring:
    image: prom/prometheus:latest
    networks:
      - monitoring_net
    ports:
      - '9090:9090'

networks:
  frontend_net:
    ipam:
      config:
        - subnet: 172.20.0.0/24
  backend_net:
    ipam:
      config:
        - subnet: 172.21.0.0/24
  monitoring_net:
    ipam:
      config:
        - subnet: 172.22.0.0/24

volumes:
  db_data:
```

Let's break down what's happening here:

- `version: '3.8'`: Specifies the Docker Compose file format version.
- `services`: Defines the different containers we want to run.
  - frontend:`A simple Nginx web server. It's connected to the`frontend_net`. We're mapping the host's port 80 to the container's port 80.
  - `backend:` A Node.js application. It's connected to the backend_net and relies on the db service. We're setting an environment variable for the database URL.
  - `db:` A PostgreSQL database. It's also connected to the `backend_net` and uses a volume to persist data.
  - `monitoring:` A Prometheus monitoring service. It resides in its own `monitoring_net` and exposes its UI on port 9090.
- `networks:` This is where we define our custom networks.
  - `frontend_net:` We're explicitly defining this network and using the ipam (IP Address Management) section to configure it. The subnet is set to `172.20.0.0/24`. This means Docker will allocate IP addresses for containers in this network from the range `172.20.0.1` to `172.20.0.254`.
  - `backend_net:` Similarly, we define a backend_net with the subnet `172.21.0.0/24`, providing a separate IP address range for the backend and database services.
  - `monitoring_net:` We create a dedicated `monitoring_net` with the subnet `172.22.0.0/24` for our monitoring service.
- `volumes:` Defines a named volume for persisting the PostgreSQL database data.

**Key Concepts Illustrated:**

- **Custom Networks:** We're creating three distinct networks instead of relying on the default Docker bridge network.
- **Subnetting:** Each network is assigned a specific subnet (`172.20.0.0/24`, `172.21.0.0/24`, `172.22.0.0/24`). This allows us to logically separate our services and control the IP address ranges they use.
- **CIDR Notation (`/24`):** The `/24` in the subnet definition indicates the prefix length, which determines the number of IP addresses available in the subnet (in this case, 256 addresses, with 254 usable for hosts).
- **Service Isolation:** The frontend and backend services are on different networks, meaning they can't directly communicate at the network layer without explicit configuration (which we haven't done in this basic example). The backend and database can communicate within their `backend_net`. The monitoring service is entirely isolated on its own network.
- **Inter-Container Communication (within a network):** Services within the same network (like backend and db in backend_net) can communicate with each other using their service names as hostnames (e.g., the `backend` can connect to the database at `db:5432`).

Docker Compose will create the networks, pull the necessary images, and start the containers, assigning them IP addresses within their respective subnets. You can inspect the networks using `docker network ls` and then` docker network inspect <network_name>` to see the assigned subnet and container IP addresses.

This example demonstrates a more advanced networking configuration that provides better isolation and organization for your Dockerized applications. You can extend this concept further by creating more networks, defining specific IP addresses for containers, and configuring network policies for more granular control.

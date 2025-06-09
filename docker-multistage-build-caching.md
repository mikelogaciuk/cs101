# Optimized multistage Docker Images and Root

## About

Just a reminder...

### Optimized Dockerfile for a Python Application

```dockerfile
# Stage 1: Build Stage
FROM python:3.10-slim AS build

# Set environment variables to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies and database drivers
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    unixodbc-dev \
    libaio1 \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install MSSQL ODBC Driver
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17

# Install Oracle Instant Client
RUN curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linux.x64-21.9.0.0.0dbru.zip && \
    unzip instantclient-basiclite.zip -d /opt/oracle && \
    rm instantclient-basiclite.zip && \
    echo "/opt/oracle/instantclient_21_9" > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

# Set working directory
WORKDIR /app

# Copy application files
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /app/

# Stage 2: Runtime Stage
FROM python:3.10-slim

# Install runtime dependencies and database drivers
RUN apt-get update && apt-get install -y \
    libpq5 \
    unixodbc \
    libaio1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Oracle Instant Client from the build stage
COPY --from=build /opt/oracle /opt/oracle
RUN echo "/opt/oracle/instantclient_21_9" > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

# Copy MSSQL ODBC Driver from the build stage
COPY --from=build /usr/lib/libmsodbcsql-17.* /usr/lib/

# Copy the application and Python dependencies from the build stage
WORKDIR /app
COPY --from=build /app /app

# Set the default command
CMD ["python", "app.py"]
```

---

### Explanation:

1. **Build Stage**:

   - Installs all build dependencies, including `build-essential`, MSSQL ODBC drivers, and Oracle Instant Client.
   - Installs Python dependencies using `pip` based on requirements.txt.
   - Compiles and prepares the application.

2. **Runtime Stage**:

   - Installs only the runtime dependencies (e.g., `libpq5`, `unixodbc`, `libaio1`).
   - Copies the pre-installed Oracle Instant Client and MSSQL ODBC drivers from the build stage.
   - Copies the application and its dependencies from the build stage.

3. **Caching**:

   - By copying requirements.txt first and installing dependencies before copying the rest of the application, Docker can cache the dependency installation step if requirements.txt hasn’t changed.

4. **Final Image**:
   - The final image is smaller because it doesn’t include build tools or unnecessary files from the build stage.

---

### For a Ruby Application

Here’s a similar approach for a Ruby application:

```dockerfile
# Stage 1: Build Stage
FROM ruby:3.2-slim AS build

# Set environment variables to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies and database drivers
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    unixodbc-dev \
    libaio1 \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install MSSQL ODBC Driver
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17

# Install Oracle Instant Client
RUN curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linux.x64-21.9.0.0.0dbru.zip && \
    unzip instantclient-basiclite.zip -d /opt/oracle && \
    rm instantclient-basiclite.zip && \
    echo "/opt/oracle/instantclient_21_9" > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

# Set working directory
WORKDIR /app

# Copy application files
COPY Gemfile Gemfile.lock /app/

# Install Ruby dependencies
RUN bundle install

# Copy the rest of the application
COPY . /app/

# Stage 2: Runtime Stage
FROM ruby:3.2-slim

# Install runtime dependencies and database drivers
RUN apt-get update && apt-get install -y \
    libpq5 \
    unixodbc \
    libaio1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Oracle Instant Client from the build stage
COPY --from=build /opt/oracle /opt/oracle
RUN echo "/opt/oracle/instantclient_21_9" > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

# Copy MSSQL ODBC Driver from the build stage
COPY --from=build /usr/lib/libmsodbcsql-17.* /usr/lib/

# Copy the application and Ruby dependencies from the build stage
WORKDIR /app
COPY --from=build /app /app

# Set the default command
CMD ["ruby", "app.rb"]
```

---

### Key Points for Both:

1. **Multi-Stage Build**: Separates build and runtime environments to reduce image size.
2. **Database Drivers**: MSSQL and Oracle drivers are installed in both stages but only runtime dependencies are included in the final image.
3. **Caching**: Dependency installation steps are optimized for caching by copying dependency files (e.g., requirements.txt or Gemfile) first.

## Cannot verify user is non-root

The error occurs because Kubernetes requires the `runAsNonRoot` setting to verify that the container is running as a non-root user. However, Kubernetes cannot verify this if the user in the Docker image is specified by name (e.g., `invtl`) instead of a numeric UID.

To fix this, you need to explicitly set a numeric UID for the non-root user in your Dockerfile.

### Updated Dockerfile

```dockerfile
# Use a base image
FROM ubuntu:20.04

# Create a new user with a specific UID and GID
RUN groupadd -g 1001 invtlgroup && useradd -u 1001 -g invtlgroup -m invtl

# Set the working directory
WORKDIR /app

# Copy application files
COPY . /app

# Change ownership of the application files to the new user
RUN chown -R invtl:invtlgroup /app

# Switch to the new user
USER 1001

# Specify the command to run
CMD ["bash"]
```

---

### Explanation:

1. **Numeric UID and GID**:

   - `useradd -u 1001`: Creates a user with a specific numeric UID (`1001`).
   - `groupadd -g 1001`: Creates a group with a specific numeric GID (`1001`).

2. **Ownership**:

   - `chown -R invtl:invtlgroup /app`: Ensures the new user owns the application files.

3. **Switch to Numeric UID**:
   - `USER 1001`: Ensures the container runs as the non-root user with the numeric UID.

---

### Kubernetes Configuration

Ensure your Kubernetes `Pod` or `Deployment` YAML file includes the `securityContext` to enforce running as a non-root user:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: inventory
spec:
  replicas: 1
  selector:
    matchLabels:
      app: inventory
  template:
    metadata:
      labels:
        app: inventory
    spec:
      containers:
        - name: inventory
          image: your-image:tag
          securityContext:
            runAsNonRoot: true
            runAsUser: 1001
```

---

### Why This Works:

- Kubernetes can now verify that the container runs as a non-root user because the `USER` directive in the Dockerfile uses a numeric UID (`1001`).
- The `securityContext` in the Kubernetes YAML ensures the container adheres to the `runAsNonRoot` policy.

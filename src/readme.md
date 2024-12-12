# Run
- run frontend
```bash
# at root/src/frontend/
npx expo start

# into npx
# for web seeing
w

# reload
r
```
- run backend and MySQL containers 
```bash
# at root
# according to terminal
docker compose up -d --build
# or
docker-compose up -d --build
```
- stop containers 
```bash
# (optional) -v : remove volumes defined in docker-compose.yml
# (optional) --rmi all : remove images
docker compose down -v --rmi all
```

# Enter DB conatiner
```bash
docker exec -it mysqldb mysql -uroot -p
```

# Enter Redis container
```bash
redis-cli -p 7000
```
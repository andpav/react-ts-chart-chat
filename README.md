Chat & Chart app (react + redux + react-router + flow + golang server)

## Clone
```bash
git clone https://github.com/andpav/react-chart-chat
cd react-chart-chat
```

## Install Dependencies
```bash
npm install
cd ./server
go get github.com/gorilla/websocket
```

## Run With Static From Server
```bash
npm run build
mv build server/static
cd ./server
go build
./server
```
and go to localhost:8080

## Run With Dev Server
```bash
npm start
cd ./server
go build
./server

```
and go to localhost:3000


## Note
You should to use login 'user' or 'user2' with password '12345'

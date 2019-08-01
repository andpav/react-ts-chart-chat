package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type Message struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

type Login struct {
	Login    string
	Password string
}

type Point struct {
	Name    int64 `json:"name"`
	Uv    int `json:"uv"`
	Pv    int `json:"pv"`
	Amt    int `json:"amt"`
}

var (
connections = make(map[*websocket.Conn]struct{})
)
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	http.HandleFunc("/login", loginHandler)

	// protection of this routes: soon
	http.HandleFunc("/chat", chatHandler)
	http.HandleFunc("/chart", chartHandler)

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", http.StripPrefix("/", fs))

	panic(http.ListenAndServe(":8080", nil))
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	decoder := json.NewDecoder(r.Body)
	var t Login
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}

	//fmt.Println("data: ", t)

	if (t.Login != "user" && t.Login != "user2" || t.Password != "12345") {
		w.WriteHeader(http.StatusBadRequest)

		return
	}

	w.WriteHeader(http.StatusOK)
}

func chatHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	//fmt.Println("connection!!! ")

	conn, err := websocket.Upgrade(w, r, w.Header(), 1024, 1024)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		log.Println(err)
		return
	}

	connections[conn] = struct{}{}

	go sendChatData(conn)
}

func sendChatData(conn *websocket.Conn) {
	for {
		message := Message{}

		err := conn.ReadJSON(&message)
		if err != nil {
			fmt.Println("Error reading json.", err)

			break
		}

		//fmt.Printf("Got message: %#v\n", message)

		for i := range connections {
			if err = i.WriteJSON(message); err != nil {
				fmt.Println(err)
				delete(connections, i);
			}
		}
	}
}

func chartHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	conn, err := websocket.Upgrade(w, r, w.Header(), 1024, 1024)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		log.Println(err)
		return
	}

	go sendChartData(conn)
}

func sendChartData(conn *websocket.Conn) {
	var i int64 = 1

	for {
		point := Point{Name: i, Uv: rand.Intn(3000) + 1000, Pv: rand.Intn(4000) + 6000, Amt: rand.Intn(1000) + 2000}

		//fmt.Println("point: ", point)

		if err := conn.WriteJSON(point); err != nil {
			break
		}

		i += 1

		time.Sleep(time.Second)
	}
}
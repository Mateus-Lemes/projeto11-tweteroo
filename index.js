import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

const users = [];
const map = new Map();

app.post("/sign-up", (request, response) => {
    const body = request.body;
    users.push(body);
    map.set(`${body.username}`, body.avatar);
    response.send("Ok");
})

const tweets = [];
app.post("/tweets", (request, response) => {
    const body = request.body;
    const tweet = {
        username: body.username,
        avatar: map.get(`${body.username}`),
        tweet: body.tweet
    }
    tweets.push(tweet);
    response.send("ok");
})

app.get("/tweets", (request, response)=> {
    let tweetsReverse = tweets.slice(-10);
    tweetsReverse = tweetsReverse.reverse();
    response.send(tweetsReverse);
})

app.listen(5000, ()=> {console.log("o servidor está rodando na porta 5000")})
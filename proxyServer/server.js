import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
dotenv.config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const CLIENT_ID = process.env.VITE_CLIENT_ID;
const VITE_CLIENT_SECRET = process.env.VITE_CLIENT_SECRET;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/access_token", async (request, response) => {
  const params = `?client_id=${CLIENT_ID}&client_secret=${VITE_CLIENT_SECRET}&code=${request.query.code}`;


  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      response.json(data);
    });
});

app.listen(4000, () => {
  console.log("server start on port 4000, ");
});

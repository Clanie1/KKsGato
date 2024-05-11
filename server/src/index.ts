import express from "express";
import dotenv from "dotenv";
import supabase from "./data/supabase";
import mqtt from "mqtt";
dotenv.config();

const client = mqtt.connect("mqtt://mqtt.eclipseprojects.io");

client.on("connect", function () {
  client.subscribe("iot-cetys/cat");
});

client.on("error", function (error) {
  console.error("MQTT client error: ", error);
});

let entrada: Date | null = null;

client.on("message", function (topic, message) {
  const mssg = message.toString();
  console.log(topic, message.toString());
  if (mssg == "ENTRAR") {
    entrada = new Date();
  }
  if (mssg == "SALIR" && entrada != null) {
    const salida = new Date();
    insertRecord({ started_at: entrada, ended_at: salida });
    entrada = null;
  }
});

const insertRecord = async (obj: any) => {
  let cosa = await supabase.from("records").insert(obj);
};

const app = express();
const port = process.env.PORT;

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("records").select("*");
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

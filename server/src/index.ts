import express from "express";
import dotenv from "dotenv";
import supabase from "./data/supabase";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("records").select("*");
  console.log(data);
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

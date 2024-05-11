import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = "https://iwbwasposlflmsmyyzyh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("Missing Supabase key");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

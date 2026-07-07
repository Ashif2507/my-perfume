import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fetch() {
  const { data, error } = await supabase.from('orders').select('*, customers(*)');
  console.log("Error:", error);
  console.log("Data:", JSON.stringify(data, null, 2));
}
fetch();

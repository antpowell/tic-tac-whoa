import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const dbService = () => {
  const createGame = async (ids: number[]) => {
    const { data, error } = await supabase.from('games').insert({ players: ids }).select();
    if (error) {
      console.log(JSON.stringify(ids));
      console.log(`game creation failed be at db level: ${JSON.stringify(error)}`);
      console.log(JSON.stringify({ players: ids }));
    }
    return { data, error };
  };

  const updateGame = async ({ id: id, data }: { id: number; data: { ended_at: number; winner: number | null } }) => {
    const { error } = await supabase
      .from('games')
      .update({ ended_at: data.ended_at, winner: data.winner })
      .eq('id', id);
    if (error) {
      console.log(`game update failed be at db level: ${JSON.stringify(error)}`);
      console.log(JSON.stringify({ id, data }));
    }

    return { error };
  };

  return { createGame, updateGame };
};

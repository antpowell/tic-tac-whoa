import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function dbService() {
  const getData = (table: string) => {
    return supabase.from(table).select('*');
  };

  const addData = (table: string, data: Record<string, unknown>) => {
    return supabase.from(table).insert(data);
  };

  const addUser = (displayName: string) => {
    return supabase.from('players').insert({ display_name: displayName }).select();
  };

  const getUser = (playerId: string) => {
    return supabase.from('players').select().eq('id', playerId);
  };

  const addToScoreBoard = ({
    p1,
    p2,
    game_id,
    winners_id
  }: {
    p1: number;
    p2: number;
    game_id: number;
    winners_id: number;
  }) => {
    return supabase.from('scoreboards').insert({ p1, p2, game_id, winners_id }).select();
  };

  const getMostActivePlayers = () => supabase.rpc('get_most_active_players');

  return { getData, addData, addUser, getUser, addToScoreBoard, getMostActivePlayers };
}

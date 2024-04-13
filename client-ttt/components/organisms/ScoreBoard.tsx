'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dbService from '@/services/dbService';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect } from 'react';

export default function ScoreBoard() {
  useSignals();

  const leaderBoardData = useSignal([]);

  useEffect(() => {
    const getMostActivePlayers = async () => {
      const { data, error } = await dbService().getMostActivePlayers();

      // console.log('data', data, 'error', error);

      leaderBoardData.value = data;
    };
    getMostActivePlayers();
  }, []);

  console.log('leaderBoardData', leaderBoardData.value);
  const createTables = () => {
    if (leaderBoardData.value.length === 0) return;

    return leaderBoardData.value.map((player: any) => {
      return (
        <TableRow key={player.id}>
          <TableCell>{player.display_name}</TableCell>
          <TableCell className="hidden sm:table-cell">{player.total_users}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Leader Board</CardTitle>
        <CardDescription>Your most active competitors</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DisplayName</TableHead>
              <TableHead className="hidden sm:table-cell">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{createTables()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

'use client';
import React from 'react';
import { Input } from '../ui/input';
import dbService from '@/services/dbService';
import { playerNameInput } from '@/utils/Signals/signals';
import { Button } from '../ui/button';
import { getSocketService } from '@/services/socketService';
import { Player1Signal } from '@/utils/PlayerState';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

export const SearchForm = () => {
  useSignals();
  const invalidEntry = useSignal(false);
  // onChange={e => (playerNameInput.value = e.target.value)}
  // onClick={() => getSocketService().emit('searchForRoom', { name: playerNameInput.peek() })}
  return (
    <form
      className="flex flex-col gap-4"
      action={async (FormData: FormData) => {
        const text = FormData.get('text');
        if (!text || text.toString().length < 2) {
          invalidEntry.value = true;
          return;
        }
        invalidEntry.value = false;

        const { data, error } = await dbService().addUser(text as string);
        console.log(data, error);
        if (!error) {
          Player1Signal.value.playerName.value = data[0].display_name;
          Player1Signal.value.playerId.value = data[0].id;
          getSocketService().emit('searchForRoom', { name: data[0].display_name, id: data[0].id });
        }
      }}>
      <Input
        name="text"
        placeholder="Display Name"
        minLength={3}
        className={invalidEntry.value ? 'border-red-500' : ''}
      />
      {invalidEntry.value && <span className="text-red-500 text-xs">Display name must be at least 3 characters</span>}
      <Button>Search</Button>
    </form>
  );
};

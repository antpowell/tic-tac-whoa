// 'use client';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { signal } from '@preact/signals-react';
// import { useSignals } from '@preact/signals-react/runtime';
// import Link from 'next/link';
// import { ReactElement } from 'react';
// import { GameFoundResponseType } from '../types/GameFoundResponseType';

// const socket = new WebSocket('ws://localhost:3003');

// const RoomSearch = () => {
//   useSignals();

//   socket.onopen = event => {
//     console.log('connection to server established');
//     console.log(JSON.stringify(event, null, 2));
//   };

//   socket.addEventListener('gameFound', e => {
//     console.log(`game found: ${JSON.stringify(e, null, 2)}`);
//     console.log(JSON.stringify(e, null, 2));
//   });

//   socket.addEventListener('message', e => {
//     let event: string = '';
//     let data: Record<string, unknown> = {};
//     // console.log('got message', e.data);

//     // if (typeof e.data === 'object') {
//     const obj = JSON.parse(e.data);
//     event = obj.event;
//     data = obj.data;

//     console.log(`event: ${event} data: ${data}`);

//     if (event.data.includes('gameFound')) {
//       console.log(data.gameRoom);
//       const response = JSON.parse(event.data) as as GameFoundResponseType;
//       if (data.gameRoom.includes(message.value)) console.log(`Welcome player ${data.activePlayers}!`);
//     }

//     if (event === 'currentGameData') {
//       showPlayers(data.gameRoom as string[]);
//       // }
//     }
//     // const data = JSON.parse(e.data);
//     console.log(e.data.toString());
//     // const { event, data } = await new Response(e.data).json();
//     // console.log(event);
//     // console.log(JSON.stringify(data, null, 2));
//   });

//   const constructMessage = ({ event, data }: { event: string; data: Record<string, unknown> }) => {
//     const obj = { event: event, data: data };
//     const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
//     return blob;
//   };

//   const message = signal<string>('');

//   const searchForRoom = ({ playerName }: { playerName: string }) => {
//     const message = constructMessage({ event: 'searchForRoom', data: { name: playerName } });

//     socket.send(message);

//     console.log('searching for room...');
//   };

//   let activePlayersList = signal<ReactElement[]>([]);
//   const showPlayers = (activePlayers: string[]) => {
//     const ap = JSON.stringify(activePlayers);
//     console.log(`active players: ${ap}`);
//     // console.log(`active players: ${activePlayers[0].name}`);
//     if (activePlayers.length > 0) {
//       activePlayersList.value = activePlayers.map((p, index) => <div key={index}>{p}</div>);
//     }
//   };

//   return (
//     <div className="flex min-h-svh flex-col items-stretch justify-around bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8 text-white">
//       <div className="self-center">RoomSearch</div>
//       <div>
//         <Card className="">
//           <CardHeader>
//             <CardTitle>Game Room</CardTitle>
//           </CardHeader>
//           <CardContent className="grid gap-8">
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
//                 <AvatarFallback>OM</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Olivia Martin</p>
//                 <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">Playing</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
//                 <AvatarFallback>JL</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Jackson Lee</p>
//                 <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">Paying</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
//                 <AvatarFallback>IN</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
//                 <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">+$299.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
//                 <AvatarFallback>WK</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">William Kim</p>
//                 <p className="text-sm text-muted-foreground">will@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">+$99.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
//                 <AvatarFallback>SD</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Sofia Davis</p>
//                 <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">+$39.00</div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <Input onChange={e => (message.value = e.target.value)} />
//       <div className="flex justify-around">
//         <Button value={'Play Again'} onClick={() => searchForRoom({ playerName: message.value })}>
//           Play Again
//         </Button>
//         <Link href={'/'}>
//           <Button variant={'secondary'}>Home</Button>
//         </Link>
//       </div>
//       <div>{activePlayersList}</div>
//     </div>
//   );
// };

// export default RoomSearch;

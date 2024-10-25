import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from '~/components/ui/button';
import { TextField } from '~/components/ui/textfield';

export const Route = createFileRoute('/socket/')({
  component: SocketPage,
});

const socket = io('https://api.app-staging.hmif.dev', {
  autoConnect: false,
});

function SocketPage() {
  useEffect(() => {
    function handleConnect() {
      console.log('Connected to server');
    }

    function handleDisconnect() {
      console.log('Disconnected from server');
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('reply', (reply) => {
      setReplies([...replies, reply]);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  });

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [replies, setReplies] = useState<string[]>([]);

  return (
    <div>
      <h1>Socket Page</h1>

      <Button onClick={() => socket.connect()}>Connect</Button>
      <Button onClick={() => socket.disconnect()}>Disconnect</Button>

      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button
        onClick={() => {
          socket.emit('message', message);
          setMessages([...messages, message]);
          setMessage('');
        }}
      >
        Send
      </Button>

      <h2>Messages:</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>

      <h2>Replies:</h2>
      <ul>
        {replies.map((reply, i) => (
          <li key={i}>{reply}</li>
        ))}
      </ul>
    </div>
  );
}

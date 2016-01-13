import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  // This is really heavy, should be refactored later
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store)); // Security threat to accept everything
  });
}

const Disconnect = (socket: any) => {
  socket.on("disconnect", () => {
    console.info(`Socket ${socket.id} disconnected`);
  });
};

export { Disconnect };

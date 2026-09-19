import { createApp } from "./app";

const { httpServer } = createApp();
const port = Number(process.env.PORT ?? 3000);

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
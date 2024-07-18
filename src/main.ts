import { Env } from './env';
import { httpServer } from './server';

httpServer.listen(Env.PORT, () => {
  console.log(`Server is running on http://localhost:${Env.PORT}`);
});

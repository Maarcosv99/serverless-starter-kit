import { handlerPath } from '@libraries/handler-resolver'
import { documentation } from './documentation';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'user/delete',
        cors: true,
        ...documentation
      },
    },
  ],
};

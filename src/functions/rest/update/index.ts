import { handlerPath } from '@libraries/handler-resolver'
import { documentation } from './documentation'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'user/update',
        cors: true,
        ...documentation
      },
    },
  ],
};

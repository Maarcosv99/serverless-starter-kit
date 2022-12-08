import { handlerPath } from '@libraries/handler-resolver'
import { documentation } from './documentation'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user/search',
        cors: true,
        ...documentation
      },
    },
  ],
};

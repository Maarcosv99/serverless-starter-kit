import { handlerPath } from '@libraries/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user/create'
      },
    },
  ],
};

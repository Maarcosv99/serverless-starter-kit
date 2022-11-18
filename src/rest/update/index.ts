import { handlerPath } from '@libraries/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'user/update'
      },
    },
  ],
};

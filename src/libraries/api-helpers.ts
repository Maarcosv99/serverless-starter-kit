export const STATUS_CODE = {
  CREATE: 201,
  UPDATE: 204,
  DELETE: 204,
  READ: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400
} as const

export function JsonResponse(statusCode: number, body: Record<string, any>) {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2)
  }
}
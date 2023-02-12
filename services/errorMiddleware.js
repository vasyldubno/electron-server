import { ApiError } from "./apiError"

export const errorMiddleware = (err, req, res, next) => {
  if(err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message})
  }
  return res.status(500).json({ message: 'Don"t handle error'})
}
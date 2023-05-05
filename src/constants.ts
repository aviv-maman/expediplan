const env = process.env.NODE_ENV;
export const HOSTNAME =
  env === 'development' ? 'http://localhost:3000' : env === 'test' ? process.env.NEXT_PUBLIC_HOSTNAME_PREVIEW : process.env.NEXT_PUBLIC_HOSTNAME;

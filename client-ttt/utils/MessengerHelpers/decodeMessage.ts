export const decodeMessage = (message: string) => {
  return JSON.parse(Buffer.from(message, 'base64').toString());
};

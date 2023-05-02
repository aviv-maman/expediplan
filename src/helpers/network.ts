/**
 * Fake delay for async calls. Default is 0.5 seconds.
 * @param seconds - Seconds to delay
 * @returns Promise<boolean>
 */
export const fakeDelay = (seconds?: number) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

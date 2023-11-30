const sleep = async (millis: number) => {
  return new Promise((r) => setTimeout(r, millis));
}

export const commonHelpers = {
  sleep
}
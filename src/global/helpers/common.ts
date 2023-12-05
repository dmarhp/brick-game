const dispatchCustomEvent = (eventName: string, detail: any) => {
  const event = new CustomEvent(eventName, { detail});
  window.dispatchEvent(event);
}

const sleep = async (millis: number) => {
  return new Promise((r) => setTimeout(r, millis));
}

export const commonHelpers = {
  dispatchCustomEvent,
  sleep
}
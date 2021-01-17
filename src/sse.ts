interface SseData {
  [key: string]: any;
}

export default function sse(
  eventType: string,
  data: SseData | string,
  id: string
) {
  return `event: ${eventType}\ndata: ${JSON.stringify(data)}\nid: ${id}\n\n`;
}

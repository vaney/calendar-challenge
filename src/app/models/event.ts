export class Event {
  id: string;
  start: number;
  end: number;
  left: number;
  height: number;
  width: number;
  title: string;
  location: string;

  constructor(event?: Event|any) {
    if (!event) {
      event = {
        id: Event.uuid()
      };
    }

    this.deserialize(event);
  }

  private static uuid(): string {
    return `${Event.S4()}${Event.S4()}-${Event.S4()}-${Event.S4()}-${Event.S4()}-${Event.S4()}${Event.S4()}${Event.S4()}`;
  }

  private static S4(): string {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  deserialize(event: Event|any) {
    this.id = event.id || Event.uuid();
    this.start = event.start;
    this.end = event.end;
    this.left = event.left;
    this.height = event.height;
    this.width = event.width;
    this.title = event.title || 'Sample Item';
    this.location = event.location || 'Sample Location';
  }
}

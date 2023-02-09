import { EventTopic } from "../event-topic.enum";

export abstract class BaseEvent<T> {
  public abstract readonly topic: EventTopic;
  public abstract payload: T;
}

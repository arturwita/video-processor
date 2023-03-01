import * as amqplib from "amqplib";

export class RabbitListener {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;
  private queue: string;
  private exchange: string; // todo: remove me?

  public async connect(url: string, exchange: string, queue: string) {
    this.connection = await amqplib.connect(url);
    this.channel = await this.connection.createChannel();
    this.queue = queue;
    this.exchange = exchange;

    await this.channel.assertQueue(queue);
    await this.channel.checkExchange(exchange);
    await this.channel.assertExchange(exchange, "topic");
  }

  public async bindTopics(topics: string[]) {
    await Promise.all(
      topics.map((topic) =>
        this.channel.bindQueue(this.queue, this.exchange, topic)
      )
    );
  }

  // public async listen<T>(topic: string): Promise<{ msg: T; time: number }> {
  public async listen<T>(): Promise<{ msg: T; time: number; topic: string }> {
    // return this.channel.consume(this.queue, (message) => {
    //   console.log(message.fields);
    //   const { content } = message;
    //   this.channel.ack(message);
    //
    //   return {
    //     msg: JSON.parse(content.toString()),
    //     time: new Date().getTime(),
    //   };
    // });

    return new Promise((resolve) =>
      this.channel.consume(this.queue, (message) => {
        // console.log(message.fields);
        const { content } = message;
        this.channel.ack(message);

        resolve({
          msg: JSON.parse(content.toString()),
          time: new Date().getTime(),
          topic: message.fields.routingKey,
        });
      })
    );
  }

  public async close() {
    return this.connection.close();
  }
}

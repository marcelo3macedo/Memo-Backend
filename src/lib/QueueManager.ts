import { Connection, Channel, connect, Message } from "amqplib";
import queue from "@config/queue";

class QueueManager {
  static conn: Connection;
  static channel: Channel;
  
  static async start(): Promise<void> {
    this.conn = await connect(queue.url);
    this.channel = await this.conn.createChannel();
  }

  static async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  static async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  static async consume(queue: string, callback: (message: Message) => void) {
    this.channel.assertQueue(queue)
    
    return this.channel.consume(queue, (message) => {
      callback(message);
      this.channel.ack(message);
    });
  }
}

export default QueueManager
export interface IMessage {
    sender: string;
    text: string;
    time: Date;
    origin: originType;
  }
export enum originType {
    Client = "Client",
    Server = "Server"
}
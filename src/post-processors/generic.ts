import { PostProcessor } from "../service.js";

export default class GenericPostProcessor extends PostProcessor {
  process(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get name(): string {
    return "Generic Post Processor";
  }
  get version(): string {
    return "0.0.1";
  }
}

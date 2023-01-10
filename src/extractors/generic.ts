import { Extractor, Metadata } from "../service.js";

export default class GenericExtractor extends Extractor {
  initialize(): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
  release(): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
  checkResponsibility(url: string): boolean {
    throw new Error("Method not implemented.");
  }
  fetchMetadata(url: string): Promise<Metadata | null> {
    throw new Error("Method not implemented.");
  }
  get name(): string {
    throw new Error("Method not implemented.");
  }
  get version(): string {
    throw new Error("Method not implemented.");
  }
}

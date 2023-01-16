import { Extractor, Metadata } from "../service.js";

export default class GenericExtractor extends Extractor {
  initialize = undefined;
  release = undefined;
  checkResponsibility(): boolean {
    return true;
  }
  fetchMetadata(): Promise<Metadata | null> {
    throw new Error("Method not implemented.");
  }
  get name(): string {
    return "Generic Extractor";
  }
  get version(): string {
    return "0.0.1";
  }
}

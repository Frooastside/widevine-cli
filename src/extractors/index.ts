import { Extractor } from "../service.js";
import GenericExtractor from "./generic.js";
import WakanimExtractor from "./wakanim.js";

export default [new WakanimExtractor()] as Extractor[];
export const generic = new GenericExtractor();

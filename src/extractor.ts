import * as meriyah from "meriyah";
import { ESTree } from "meriyah";
import {
  isArrayExpression,
  isBlockStatement,
  isCallExpression,
  isExpressionStatement,
  isFunctionDeclaration,
  isFunctionExpression,
  isIdentifier,
  isIfStatement,
  isLiteral,
  isObjectExpression,
  isProgram,
  isProperty
} from "./expressions.js";

type NativeObjects =
  | null
  | undefined
  | string
  | boolean
  | number
  | NativeObjects[]
  | {
      [key: string]: NativeObjects;
    };

export function extractObject<ObjectType>(source: string, checkObject: (object: unknown) => object is ObjectType): ObjectType | null {
  const ast = meriyah.parseScript(source);
  let foundObject: ObjectType | null = null;
  walkTree(ast, (node) => {
    if (isObjectExpression(node)) {
      const object = reconstructConstants(node);
      if (checkObject(object)) {
        foundObject = object;
      }
    }
  });
  return foundObject;
}

function reconstructConstants(node: ESTree.ObjectExpression | ESTree.Literal | ESTree.ArrayExpression): NativeObjects {
  if (isObjectExpression(node)) {
    const object: {
      [key: string]: NativeObjects;
    } = {};
    node.properties.forEach((property) => {
      if (!isProperty(property)) {
        throw new Error("A property is expected to be a property!");
      }
      if (isIdentifier(property.key) && (isObjectExpression(property.value) || isArrayExpression(property.value) || isLiteral(property.value))) {
        object[property.key.name] = reconstructConstants(property.value);
      }
    });
    return object;
  } else if (isLiteral(node)) {
    return typeof node.value === "string" || typeof node.value === "number" || typeof node.value === "boolean" || node.value === null
      ? node.value
      : null;
  } else {
    return node.elements
      .filter(
        (node): node is ESTree.ObjectExpression | ESTree.Literal | ESTree.ArrayExpression =>
          node !== null && (isObjectExpression(node) || isArrayExpression(node) || isLiteral(node))
      )
      .map((node) => reconstructConstants(node));
  }
}

function walkTree(node: ESTree.Node, callback: (node: ESTree.Node) => void): void {
  callback(node);

  const deeper = (node: ESTree.Node) => walkTree(node, callback);

  if (isBlockStatement(node)) {
    node.body.forEach((child) => deeper(child));
  } else if (isCallExpression(node)) {
    deeper(node.callee);
    node.arguments.forEach((argument) => deeper(argument));
  } else if (isExpressionStatement(node)) {
    deeper(node.expression);
  } else if (isFunctionExpression(node)) {
    if (node.id) {
      deeper(node.id);
    }
    node.params.forEach((parameter) => deeper(parameter));
    if (node.body) {
      deeper(node.body);
    }
  } else if (isFunctionDeclaration(node)) {
    if (node.id) {
      deeper(node.id);
    }
    node.params.forEach((node) => deeper(node));
    if (node.body) {
      deeper(node.body);
    }
  } else if (isIfStatement(node)) {
    deeper(node.test);
    deeper(node.consequent);
    if (node.alternate) {
      deeper(node.alternate);
    }
  } else if (isObjectExpression(node)) {
    node.properties.forEach((property) => deeper(property));
  } else if (isProgram(node)) {
    node.body.forEach((child) => deeper(child));
  } else if (isProperty(node)) {
    deeper(node.key);
    deeper(node.value);
  }
}

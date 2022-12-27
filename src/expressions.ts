import { ESTree } from "meriyah";

export function isArrayExpression(node: ESTree.Node): node is ESTree.ArrayExpression {
  return node.type === "ArrayExpression";
}

export function isArrayPattern(node: ESTree.Node): node is ESTree.ArrayPattern {
  return node.type === "ArrayPattern";
}

export function isArrowFunctionExpression(node: ESTree.Node): node is ESTree.ArrowFunctionExpression {
  return node.type === "ArrowFunctionExpression";
}

export function isAssignmentExpression(node: ESTree.Node): node is ESTree.AssignmentExpression {
  return node.type === "AssignmentExpression";
}

export function isAssignmentPattern(node: ESTree.Node): node is ESTree.AssignmentPattern {
  return node.type === "AssignmentPattern";
}

export function isAwaitExpression(node: ESTree.Node): node is ESTree.AwaitExpression {
  return node.type === "AwaitExpression";
}

export function isBinaryExpression(node: ESTree.Node): node is ESTree.BinaryExpression {
  return node.type === "BinaryExpression";
}

export function isBlockStatement(node: ESTree.Node): node is ESTree.BlockStatement {
  return node.type === "BlockStatement";
}

export function isBreakStatement(node: ESTree.Node): node is ESTree.BreakStatement {
  return node.type === "BreakStatement";
}

export function isCallExpression(node: ESTree.Node): node is ESTree.CallExpression {
  return node.type === "CallExpression";
}

export function isChainExpression(node: ESTree.Node): node is ESTree.ChainExpression {
  return node.type === "ChainExpression";
}

export function isImportExpression(node: ESTree.Node): node is ESTree.ImportExpression {
  return node.type === "ImportExpression";
}

export function isCatchClause(node: ESTree.Node): node is ESTree.CatchClause {
  return node.type === "CatchClause";
}

export function isClassBody(node: ESTree.Node): node is ESTree.ClassBody {
  return node.type === "ClassBody";
}

export function isClassDeclaration(node: ESTree.Node): node is ESTree.ClassDeclaration {
  return node.type === "ClassDeclaration";
}

export function isClassExpression(node: ESTree.Node): node is ESTree.ClassExpression {
  return node.type === "ClassExpression";
}

export function isConditionalExpression(node: ESTree.Node): node is ESTree.ConditionalExpression {
  return node.type === "ConditionalExpression";
}

export function isContinueStatement(node: ESTree.Node): node is ESTree.ContinueStatement {
  return node.type === "ContinueStatement";
}

export function isDebuggerStatement(node: ESTree.Node): node is ESTree.DebuggerStatement {
  return node.type === "DebuggerStatement";
}

export function isDecorator(node: ESTree.Node): node is ESTree.Decorator {
  return node.type === "Decorator";
}

export function isDoWhileStatement(node: ESTree.Node): node is ESTree.DoWhileStatement {
  return node.type === "DoWhileStatement";
}

export function isEmptyStatement(node: ESTree.Node): node is ESTree.EmptyStatement {
  return node.type === "EmptyStatement";
}

export function isExportAllDeclaration(node: ESTree.Node): node is ESTree.ExportAllDeclaration {
  return node.type === "ExportAllDeclaration";
}

export function isExportDefaultDeclaration(node: ESTree.Node): node is ESTree.ExportDefaultDeclaration {
  return node.type === "ExportDefaultDeclaration";
}

export function isExportNamedDeclaration(node: ESTree.Node): node is ESTree.ExportNamedDeclaration {
  return node.type === "ExportNamedDeclaration";
}

export function isExportSpecifier(node: ESTree.Node): node is ESTree.ExportSpecifier {
  return node.type === "ExportSpecifier";
}

export function isExpressionStatement(node: ESTree.Node): node is ESTree.ExpressionStatement {
  return node.type === "ExpressionStatement";
}

export function isPropertyDefinition(node: ESTree.Node): node is ESTree.PropertyDefinition {
  return node.type === "PropertyDefinition";
}

export function isForInStatement(node: ESTree.Node): node is ESTree.ForInStatement {
  return node.type === "ForInStatement";
}

export function isForOfStatement(node: ESTree.Node): node is ESTree.ForOfStatement {
  return node.type === "ForOfStatement";
}

export function isForStatement(node: ESTree.Node): node is ESTree.ForStatement {
  return node.type === "ForStatement";
}

export function isFunctionDeclaration(node: ESTree.Node): node is ESTree.FunctionDeclaration {
  return node.type === "FunctionDeclaration";
}

export function isFunctionExpression(node: ESTree.Node): node is ESTree.FunctionExpression {
  return node.type === "FunctionExpression";
}

export function isIdentifier(node: ESTree.Node): node is ESTree.Identifier {
  return node.type === "Identifier";
}

export function isIfStatement(node: ESTree.Node): node is ESTree.IfStatement {
  return node.type === "IfStatement";
}

export function isImport(node: ESTree.Node): node is ESTree.Import {
  return node.type === "Import";
}

export function isImportDeclaration(node: ESTree.Node): node is ESTree.ImportDeclaration {
  return node.type === "ImportDeclaration";
}

export function isImportDefaultSpecifier(node: ESTree.Node): node is ESTree.ImportDefaultSpecifier {
  return node.type === "ImportDefaultSpecifier";
}

export function isImportNamespaceSpecifier(node: ESTree.Node): node is ESTree.ImportNamespaceSpecifier {
  return node.type === "ImportNamespaceSpecifier";
}

export function isImportSpecifier(node: ESTree.Node): node is ESTree.ImportSpecifier {
  return node.type === "ImportSpecifier";
}

export function isLabeledStatement(node: ESTree.Node): node is ESTree.LabeledStatement {
  return node.type === "LabeledStatement";
}

export function isLiteral(node: ESTree.Node): node is ESTree.Literal {
  return node.type === "Literal";
}

export function isLogicalExpression(node: ESTree.Node): node is ESTree.LogicalExpression {
  return node.type === "LogicalExpression";
}

export function isMemberExpression(node: ESTree.Node): node is ESTree.MemberExpression {
  return node.type === "MemberExpression";
}

export function isMetaProperty(node: ESTree.Node): node is ESTree.MetaProperty {
  return node.type === "MetaProperty";
}

export function isMethodDefinition(node: ESTree.Node): node is ESTree.MethodDefinition {
  return node.type === "MethodDefinition";
}

export function isNewExpression(node: ESTree.Node): node is ESTree.NewExpression {
  return node.type === "NewExpression";
}

export function isObjectExpression(node: ESTree.Node): node is ESTree.ObjectExpression {
  return node.type === "ObjectExpression";
}

export function isObjectPattern(node: ESTree.Node): node is ESTree.ObjectPattern {
  return node.type === "ObjectPattern";
}

export function isParenthesizedExpression(node: ESTree.Node): node is ESTree.ParenthesizedExpression {
  return node.type === "ParenthesizedExpression";
}

export function isPrivateIdentifier(node: ESTree.Node): node is ESTree.PrivateIdentifier {
  return node.type === "PrivateIdentifier";
}

export function isProgram(node: ESTree.Node): node is ESTree.Program {
  return node.type === "Program";
}

export function isProperty(node: ESTree.Node): node is ESTree.Property {
  return node.type === "Property";
}

export function isRestElement(node: ESTree.Node): node is ESTree.RestElement {
  return node.type === "RestElement";
}

export function isReturnStatement(node: ESTree.Node): node is ESTree.ReturnStatement {
  return node.type === "ReturnStatement";
}

export function isSequenceExpression(node: ESTree.Node): node is ESTree.SequenceExpression {
  return node.type === "SequenceExpression";
}

export function isSpreadElement(node: ESTree.Node): node is ESTree.SpreadElement {
  return node.type === "SpreadElement";
}

export function isStaticBlock(node: ESTree.Node): node is ESTree.StaticBlock {
  return node.type === "StaticBlock";
}

export function isSuper(node: ESTree.Node): node is ESTree.Super {
  return node.type === "Super";
}

export function isSwitchCase(node: ESTree.Node): node is ESTree.SwitchCase {
  return node.type === "SwitchCase";
}

export function isSwitchStatement(node: ESTree.Node): node is ESTree.SwitchStatement {
  return node.type === "SwitchStatement";
}

export function isTaggedTemplateExpression(node: ESTree.Node): node is ESTree.TaggedTemplateExpression {
  return node.type === "TaggedTemplateExpression";
}

export function isTemplateElement(node: ESTree.Node): node is ESTree.TemplateElement {
  return node.type === "TemplateElement";
}

export function isTemplateLiteral(node: ESTree.Node): node is ESTree.TemplateLiteral {
  return node.type === "TemplateLiteral";
}

export function isThisExpression(node: ESTree.Node): node is ESTree.ThisExpression {
  return node.type === "ThisExpression";
}

export function isThrowStatement(node: ESTree.Node): node is ESTree.ThrowStatement {
  return node.type === "ThrowStatement";
}

export function isTryStatement(node: ESTree.Node): node is ESTree.TryStatement {
  return node.type === "TryStatement";
}

export function isUpdateExpression(node: ESTree.Node): node is ESTree.UpdateExpression {
  return node.type === "UpdateExpression";
}

export function isUnaryExpression(node: ESTree.Node): node is ESTree.UnaryExpression {
  return node.type === "UnaryExpression";
}

export function isVariableDeclaration(node: ESTree.Node): node is ESTree.VariableDeclaration {
  return node.type === "VariableDeclaration";
}

export function isVariableDeclarator(node: ESTree.Node): node is ESTree.VariableDeclarator {
  return node.type === "VariableDeclarator";
}

export function isWhileStatement(node: ESTree.Node): node is ESTree.WhileStatement {
  return node.type === "WhileStatement";
}

export function isWithStatement(node: ESTree.Node): node is ESTree.WithStatement {
  return node.type === "WithStatement";
}

export function isYieldExpression(node: ESTree.Node): node is ESTree.YieldExpression {
  return node.type === "YieldExpression";
}

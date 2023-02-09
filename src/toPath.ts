export function toPath(path: string): (string & any[]) | string[] {
  if (Array.isArray(path)) return path;

  let openBrackets = path.split("[").length - 1;
  let closedBrackets = path.split("]").length - 1;

  if (openBrackets !== closedBrackets) {
    throw new Error(`Path is invalid. Has unbalanced brackets: ${path}`);
  }

  return path.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
}

export function* toPaths(path: string): Generator<string[], void, unknown> {
  // Strip quotes from beginning and end of string
  // This allows the alpha value to be present inside of quotes
  path = path.replace(/^['"]+|['"]+$/g, "");

  let matches = path.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]+))$/);
  let alpha = undefined;

  yield [path, undefined];

  if (matches) {
    path = matches[1];
    alpha = matches[2];

    yield [path, alpha];
  }
}

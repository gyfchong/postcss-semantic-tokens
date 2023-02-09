export function pathToString(path: string | string[]): string {
  if (typeof path === "string") return path;

  return path.reduce((acc: string, cur: string, i: number) => {
    if (cur.includes(".")) return `${acc}[${cur}]`;
    return i === 0 ? cur : `${acc}.${cur}`;
  }, "");
}

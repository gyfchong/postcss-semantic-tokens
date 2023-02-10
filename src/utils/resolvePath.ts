import { toPaths } from "./toPath";
import { validatePath } from "./validatePath";

export function resolvePath(config: { [index: string]: {} }, path: string) {
  const results = Array.from(toPaths(path)).map(([path, alpha]) => {
    return Object.assign(validatePath(config, path), {
      resolvedPath: path,
    });
  });

  return results.find((result) => result.isValid);
}

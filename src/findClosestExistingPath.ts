import dlv from "dlv";
import { toPath } from "./toPath";

export function findClosestExistingPath(theme: {}, path: string) {
  let parts = toPath(path);
  do {
    parts.pop();

    if (dlv(theme, parts) !== undefined) break;
  } while (parts.length);

  return parts.length ? parts : undefined;
}

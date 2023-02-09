import dlv from "dlv";
import didYouMean from "didyoumean";
import { toPath } from "./toPath";
import { pathToString } from "./pathToString";
import { isObject } from "./isObject";
import { list, listKeys } from "./list";
import { findClosestExistingPath } from "./findClosestExistingPath";
import transformThemeValue from "./transformThemeValue";

export function validatePath(
  config: { [index: string]: {} },
  path: string | string[]
) {
  const pathString = Array.isArray(path)
    ? pathToString(path)
    : path.replace(/^['"]+|['"]+$/g, "");

  const pathSegments = Array.isArray(path) ? path : toPath(pathString);

  const value = dlv(config, pathSegments);

  if (value === undefined) {
    let error = `'${pathString}' does not exist in your theme config.`;
    const parentSegments = pathSegments.slice(0, -1);
    const parentValue = dlv(config.theme, parentSegments);

    if (isObject(parentValue)) {
      const validKeys = Object.keys(parentValue).filter(
        (key) => validatePath(config, [...parentSegments, key]).isValid
      );

      const suggestion = didYouMean(
        pathSegments[pathSegments.length - 1],
        validKeys
      );

      if (suggestion) {
        error += ` Did you mean '${pathToString([
          ...parentSegments,
          suggestion,
        ])}'?`;
      } else if (validKeys.length > 0) {
        error += ` '${pathToString(
          parentSegments
        )}' has the following valid keys: ${list(validKeys)}`;
      }
    } else {
      const closestPath = findClosestExistingPath(config.theme, pathString);
      if (closestPath) {
        const closestValue = dlv(config.theme, closestPath);
        if (isObject(closestValue)) {
          error += ` '${pathToString(
            closestPath
          )}' has the following keys: ${listKeys(closestValue)}`;
        } else {
          error += ` '${pathToString(closestPath)}' is not an object.`;
        }
      } else {
        error += ` Your theme has the following top-level keys: ${listKeys(
          config
        )}`;
      }
    }

    return {
      isValid: false,
      error,
    };
  }

  if (
    !(
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "function" ||
      value instanceof String ||
      value instanceof Number ||
      Array.isArray(value)
    )
  ) {
    let error = `'${pathString}' was found but does not resolve to a string.`;

    if (isObject(value)) {
      let validKeys = Object.keys(value).filter(
        (key) => validatePath(config, [...pathSegments, key]).isValid
      );
      if (validKeys.length) {
        error += ` Did you mean something like '${pathToString([
          ...pathSegments,
          validKeys[0],
        ])}'?`;
      }
    }

    return {
      isValid: false,
      error,
    };
  }

  console.info("validatePaths: value", value);

  return {
    isValid: true,
    value,
  };
}

export function list(items: string[]) {
  return items.map((key) => `'${key}'`).join(", ");
}

export function listKeys(obj: {}) {
  return list(Object.keys(obj));
}

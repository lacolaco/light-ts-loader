export type ObjectKeys<T> = {[P in keyof T]: P}

export function getObjectKeys<T>(state: T): ObjectKeys<T> {
  return Object.keys(state).reduce((p, key) => {
    return { ...p, ...{ [key]: key } }
  }, {}) as any
}
export type ObjectKey<T, P extends keyof T> = P

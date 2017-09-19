interface Person {
  name: string;
}

export function createPerson(name: string): Person {
  return { name };
}

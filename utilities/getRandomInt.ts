export function getRandomInt(total: number): number {
  return Math.floor(Math.random() * total);
}

export function getRandomBool(): boolean {
  return Math.random() > 0.5;
}

export function repeatX(genFn: Function, num: number): any[] {
  let arr: any[] = [];
  for (let i = 0; i < num; ++i) {
    arr.push(genFn());
  }
  return arr;
}

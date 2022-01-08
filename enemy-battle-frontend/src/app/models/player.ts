export interface Player {
  name: string,
  type: 'player' | 'monster',
  life: number,
  score?: number,
  percentageType: 'success' | 'warning' | 'danger',
  turn:number,
  useSpecial:number,
  round?:number
}

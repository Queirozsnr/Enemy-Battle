export interface Player {
  name: string,
  type: 'player' | 'monster',
  life: number,
  score?: number
}

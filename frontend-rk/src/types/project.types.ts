export type StackCard = {
  alt: string
  image: string
  tags: string[]
}

export type NotableStatConfig =
  | {
      kind: 'static'
      label: string
      minDigits: number
      target: number
    }
  | {
      kind: 'monthsSince'
      monthLabel: string
      monthMinDigits: number
      startDate: string
      yearLabel: string
      yearMinDigits: number
    }

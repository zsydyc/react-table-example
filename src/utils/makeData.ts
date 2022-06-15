import namor from '@ggascoigne/namor'
import { format, subDays } from 'date-fns'

// These enums are used in the filter rendering, assumed to be string to index mapping starting at 0 and auto incremented
export enum ExperimentType {
  AutoPilot,
  Pipeline,
  Classic,
  HPO,
}

export enum ExperimentStatus {
  Successful,
  Executing,
  Failed,
  Stopped,
  None,
}

export type Experiment = {
  name: string,
  type: string,
  status?: string,
  favorite: boolean,
  description: string,
  modifiedOn: string,
  modifiedBy: string,
  createdOn: string,
  createdBy: string,
  id?: string,
}

const newExperiment = (): Experiment => {
  const expType = Math.floor(Math.random() * (Object.keys(ExperimentType).length / 2));
  const expStatus = Math.floor(Math.random() * (Object.keys(ExperimentStatus).length / 2));
  return {
    name: `Experiment-${Math.floor(Math.random() * 9999)}`,
    type: ExperimentType[expType],
    status: ExperimentStatus[expStatus],
    favorite: Math.floor(Math.random() * 2) === 1,
    description: namor.generate({ words: 4 }),
    modifiedOn: format(new Date(), "MM/dd/yyyy ppp"),
    modifiedBy: namor.generate({ words: 1 }),
    createdOn: format(new Date(), "MM/dd/yyy ppp"),
    createdBy: namor.generate({ words: 1 }),
  }
}

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export type ExperimentData = Experiment & {
  subRows?: ExperimentData[]
}


export function makeData(...lens: number[]): ExperimentData[] {
  const makeDataLevel = (depth = 0): ExperimentData[] => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newExperiment(),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }))
  }

  return makeDataLevel()
}

const newPerson = (): Person => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, saltLength: 0 }),
    lastName: namor.generate({ words: 1, saltLength: 0, subset: 'manly' }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  }
}

export type PersonData = Person & {
  subRows?: PersonData[]
}

export function makePersonData(...lens: number[]): PersonData[] {
  const makeDataLevel = (depth = 0): PersonData[] => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newPerson(),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }))
  }

  return makeDataLevel()
}

import datesThisWeek from '@/functions/getDateThisWeek'
import getFullDate from '@/functions/getFullDate'
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

export type WorkoutItemType = {
  id: string
  date: string
  name: string
  children: WorkoutSubType[]
}
export type WorkoutSubType = {
  id: string
  name: string
  info: string
  times: number
}
type CalendarContextValue = {
  workouts: WorkoutItemType[]
  onChangeWorkout: Dispatch<SetStateAction<WorkoutItemType[]>>
}

export const CalendarContext = createContext<CalendarContextValue>({} as CalendarContextValue)

export default function CalendarProvider({ children }: { children: ReactNode }) {
  const [workouts, onChangeWorkout] = useState<WorkoutItemType[]>(WorkoutList)

  const value: CalendarContextValue = { workouts, onChangeWorkout }

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}

const dates = datesThisWeek()
const WorkoutList: WorkoutItemType[] = [
  {
    id: '1',
    date: getFullDate(dates[1]),
    name: 'CHEST AND ARMS WORKOUT 💪COMPLETE GYM ROUTINE',
    children: [
      { id: '2', name: 'Bench Press Med...', info: '50 lb x 5, 60 lb x 5, 70 l...', times: 3 },
      { id: '3', name: 'Exercise B', info: '40 lb x 10', times: 1 },
    ],
  },
  {
    id: '4',
    date: getFullDate(dates[1]),
    name: 'Leg DaY',
    children: [{ id: '6', name: 'Exercise C', info: '40 lb x 10', times: 1 }],
  },
  {
    id: '7',
    date: getFullDate(dates[3]),
    name: 'Arm day',
    children: [{ id: '9', name: 'Exercise D', info: '40 lb x 10', times: 1 }],
  },
]

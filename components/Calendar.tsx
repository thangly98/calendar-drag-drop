import { useContext } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import datesThisWeek from '@/functions/getDateThisWeek'

import { CalendarContext } from './CalendarProvider'
import DayItem from './DayItem'

export default function Calendar() {
  const dates = datesThisWeek()
  const { onChangeWorkout } = useContext(CalendarContext)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (result.type === 'droppableItem') {
      if (result.source.droppableId === result.destination.droppableId) {
        onChangeWorkout((current) => {
          const itemDrag = current.find((i) => i.id === result.draggableId)
          if (itemDrag) {
            const workoutsDay = [...current].filter((i) => i.date === result.destination?.droppableId)
            workoutsDay.splice(result.source.index, 0, workoutsDay.splice(result.destination?.index ?? 0, 1)[0])
            const workouts = [...current].filter((i) => i.date !== result.destination?.droppableId).concat(workoutsDay)
            return workouts
          } else return current
        })
      } else if (result.source.droppableId !== result.destination.droppableId) {
        onChangeWorkout((current) => {
          const itemDrag = current.find((i) => i.id === result.draggableId)
          if (itemDrag) {
            const workoutsDay = [...current].filter((i) => i.date === result.destination?.droppableId)
            workoutsDay.splice(result.destination?.index ?? 0, 0, { ...itemDrag, date: result.destination?.droppableId ?? itemDrag.date })
            const workouts = [...current].filter((i) => i.date !== result.destination?.droppableId && i.id !== result.draggableId).concat(workoutsDay)
            return workouts
          } else return current
        })
      }
    } else if (result.type === 'droppableSubItem') {
      if (result.source.droppableId === result.destination.droppableId) {
        onChangeWorkout((current) => {
          return current.map((item) => {
            if (item.id === result.source.droppableId) {
              const children = [...item.children]
              children.splice(result.source.index, 0, children.splice(result.destination?.index ?? 0, 1)[0])
              return { ...item, children }
            } else return item
          })
        })
      } else if (result.source.droppableId !== result.destination.droppableId) {
        onChangeWorkout((current) => {
          const itemDrag = [...current].find((i) => i.id === result.source.droppableId)?.children.find((i) => i.id === result.draggableId)
          return current.map((item) => {
            if (item.id === result.source.droppableId) {
              return { ...item, children: item.children.filter((i) => i.id !== result.draggableId) }
            } else if (item.id === result.destination?.droppableId) {
              const children = [...item.children]
              if (itemDrag) children.splice(result.destination.index, 0, itemDrag)
              return { ...item, children }
            } else return item
          })
        })
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='Calendar_Wrapper'>
        {dates.map((date, index) => (
          <DayItem key={index} date={date} index={index} />
        ))}
      </div>
    </DragDropContext>
  )
}

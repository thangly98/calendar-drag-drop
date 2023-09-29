import { useContext } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { CalendarContext } from './CalendarProvider'
import WorkoutItem from './WorkoutItem'
import getFullDate from '@/functions/getFullDate'

type Props = {
  index: number
  date: string
}

export default function DayItem(props: Props) {
  const { workouts } = useContext(CalendarContext)

  const fullDate = getFullDate(props.date)
  const workoutData = workouts.filter((i) => i.date === fullDate)

  return (
    <div className='Day_Wrapper'>
      <div className='Day_Name'>{props.date.toString().split(' ').at(0)?.toUpperCase()}</div>

      <div className='Day_Content'>
        <div className='Day_Number'>
          {String(new Date(props.date).getDate()).padStart(2, '0')}{' '}
          <svg xmlns='http://www.w3.org/2000/svg' width='12' height='13' viewBox='0 0 12 13' fill='none'>
            <ellipse cx='6' cy='6.28129' rx='6' ry='5.91925' fill='#A0A8B1' />
            <path fill-rule='evenodd' clip-rule='evenodd' d='M7 5.29475V3.32167H5V5.29475H3V7.26783H5V9.24092H7V7.26783H9V5.29475H7Z' fill='white' />
          </svg>
        </div>
        <Droppable droppableId={fullDate} type='droppableItem'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='Workout_List'>
              {workoutData.map((item, index) => (
                <WorkoutItem key={index} data={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

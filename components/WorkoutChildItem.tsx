import { Draggable } from 'react-beautiful-dnd'
import { WorkoutSubType } from './CalendarProvider'

type Props = { index: number; data: WorkoutSubType }

export default function WorkoutChildItem({ index, data }: Props) {
  return (
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='Workout_Child_Item_Wrapper'>
          <div className='Workout_Child_Item_Name Text_Ellipsis'>{data.name}</div>
          <div className='Workout_Child_Item_Content'>
            <p className='Workout_Child_Item_Time'>{data.times}x</p>
            <p className='Workout_Child_Item_Info'>{data.info}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

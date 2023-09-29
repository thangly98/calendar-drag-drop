import { Draggable, Droppable } from 'react-beautiful-dnd'
import { WorkoutItemType } from './CalendarProvider'
import WorkoutChildItem from './WorkoutChildItem'

type Props = { index: number; data: WorkoutItemType }

export default function WorkoutItem({ index, data }: Props) {
  return (
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className='Workout_Item_Wrapper'>
          <div className='Workout_Item_Header'>
            <div {...provided.dragHandleProps} className='Workout_Item_Name'>
              {data.name}
            </div>
            <div className='Workout_Item_Action_Button'>
              <svg xmlns='http://www.w3.org/2000/svg' width='11' height='3' viewBox='0 0 11 3' fill='none'>
                <ellipse cx='1.5' cy='1.60498' rx='1.5' ry='1.47981' fill='#726EE4' />
                <ellipse cx='5.5' cy='1.60498' rx='1.5' ry='1.47981' fill='#726EE4' />
                <ellipse cx='9.5' cy='1.60498' rx='1.5' ry='1.47981' fill='#726EE4' />
              </svg>
            </div>
          </div>
          <Droppable droppableId={data.id} type='droppableSubItem'>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='Workout_Item_Children'>
                {data.children.map((item, index) => (
                  <WorkoutChildItem key={index} data={item} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className='Workout_Item_Add_Exercise'>
            <svg xmlns='http://www.w3.org/2000/svg' width='12' height='13' viewBox='0 0 12 13' fill='none'>
              <ellipse cx='6' cy='6.28129' rx='6' ry='5.91925' fill='#A0A8B1' />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M7 5.29475V3.32167H5V5.29475H3V7.26783H5V9.24092H7V7.26783H9V5.29475H7Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      )}
    </Draggable>
  )
}

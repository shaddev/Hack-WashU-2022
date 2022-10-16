import React from "react";

const ProjectGoal = (props) => {
  
    const [goal, setGoal] = props.goalAttributes;

    const onChangeGoal = (event) => {
        setGoal(parseInt(event.target.value))
    }

  return (
    <div>
      <h3>Goal</h3>
      $<input type="number" onChange={onChangeGoal} defaultValue={0} min="0"/>
    </div>
  );
};

export default ProjectGoal;

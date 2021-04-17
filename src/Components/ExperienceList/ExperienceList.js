import React from 'react';

import '../Builder/Builder.css';

function ExperienceList(props) {
  return (
    <div className="Builder__education Builder__section">
      <h2>{props.name}</h2>
      <input
        className="Builder__input Experience__input"
        type="text"
        autoComplete="off"
        placeholder="Title"
        value={props.inputs[0]}
        data-index="0"
        onChange={props.handler}
      />
      <textarea
        className="Builder__input Builder__input--summary Experience__input"
        placeholder="Description"
        autoComplete="off"
        value={props.inputs[1]}
        data-index="1"
        onChange={props.handler}
      />
      <label>
        Start date:
        <input
          className="Builder__input Experience__input"
          type="date"
          autoComplete="off"
          value={props.inputs[2]}
          data-index="2"
          onChange={props.handler}
        />
      </label>
      <label>
        End date:
        <input
          className="Builder__input Experience__input"
          type="date"
          autoComplete="off"
          value={props.inputs[3]}
          data-index="3"
          onChange={props.handler}
        />
      </label>
      <div>
        <button className="Builder__button" onClick={props.onAdd}>
          Add
        </button>
        <button className="Builder__button">Reset</button>
      </div>
      {props.list.map((el, index) => {
        let startDate, endDate;
        startDate = new Date(el.startDate);
        endDate = new Date(el.endDate);
        let monthStart, monthEnd;
        let yearStart, yearEnd;

        monthStart = startDate.toLocaleString('default', { month: 'long' });
        monthEnd = endDate.toLocaleString('default', { month: 'long' });
        yearStart = startDate.getFullYear();
        yearEnd = endDate.getFullYear();
        return (
          <div className="Experience" key={el.id}>
            <div className="Experience__title">{el.title}</div>
            <div className="Experience__description">{el.description}</div>
            {el.startDate && el.endDate
              ? `From ${monthStart} ${yearStart} to ${monthEnd} ${yearEnd}`
              : ''}

            <button
              className="Button--delete"
              data-index={index}
              onClick={props.onDelete}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ExperienceList;

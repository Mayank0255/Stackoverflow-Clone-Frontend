import React, {Fragment} from 'react';
import BaseButton from '../BaseButton/BaseButton.component';

const ButtonGroup = ({buttons, selected, setSelected}) => {
  return (
    <Fragment>
      <div className='grid--cell'>
        <div className=' grid s-btn-group js-filter-btn'>
          {buttons.map((button, index) => (
            <BaseButton
              key={index}
              text={button}
              selected={selected}
              onClick={() => setSelected(button)}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ButtonGroup;

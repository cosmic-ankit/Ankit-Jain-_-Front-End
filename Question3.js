import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClick, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={onClick}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = useCallback((index) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [items]);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          index={index}
          isSelected={index === selectedIndex}
          onClick={() => handleClick(index)}
          text={item.text}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;


/*

Here are the changes that have been made:

1)
The useState hook is now initialized with -1 instead of null, and the handleClick function now toggles the selected index instead of unconditionally setting it.

2)
The handleClick function is now wrapped with useCallback to memoize the function and prevent unnecessary re-renders.

3)
The useEffect hook now sets the selected index to -1 instead of null to match the initial state.

4)
The key prop has been added to the SingleListItem component to improve rendering performance.

5)
The propTypes declarations for SingleListItem have been simplified and the isRequired flag has been added to the items prop in the List component.


*/ 

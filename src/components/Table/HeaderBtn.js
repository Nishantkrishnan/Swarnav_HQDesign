import React from 'react';
import classNames from 'classnames';
import styles from './HeaderBtn.css';

const HeaderBtn = ({ sortFn, label, isAsc, isSortActive }) => (
  <div className={styles.headerCell}>
    {label}
    <span className={styles.sortArrows} onClick={() => sortFn(label)} role={'button'} tabIndex={0}>
      <i
        className={classNames(styles.sortUp, 'material-icons')}
        style={{ fontWeight: isSortActive && isAsc ? 'bold' : '' }}
      >
        keyboard_arrow_up
      </i>
      <i
        className={classNames(styles.sortDown, 'material-icons')}
        style={{ fontWeight: isSortActive && !isAsc ? 'bold' : '' }}
      >
        keyboard_arrow_down
      </i>
    </span>
  </div>
);

export default HeaderBtn;

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DropdownMenu.css';

class DropdownMenu extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    menuClassName: PropTypes.string,
    isDisabled: PropTypes.bool,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    items: [],
    menuClassName: '',
    isDisabled: false,
    selected: '',
    onSelect: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dropdownOpen: false,
      selected: this.props.selected,
    };
    this.onSelect = this.onSelect.bind(this);
    this.toggle = this.toggle.bind(this);
    this.offClickHandler = this.offClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.offClickHandler, false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected || '',
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.offClickHandler, false);
  }

  onSelect(event, selectedItem) {
    event.stopPropagation();
    let update = true;
    if (selectedItem === this.selected) {
      update = false;
    }

    if (update) {
      this.setState({ active: true, selected: selectedItem });
    }

    this.setState({ dropdownOpen: false });
    this.props.onSelect(selectedItem);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  offClickHandler(event) {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({ dropdownOpen: false });
    }
  }

  render() {
    const { items, menuClassName, isDisabled } = this.props;
    const menuItems =
      items &&
      items.map((item, i) => {
        if (item && typeof item === 'object') {
          return (
            <li
              key={i}
              className={classNames(
                styles.list,
                item.name === this.state.selected ? styles.active : '',
              )}
              onClick={event => this.onSelect(event, item)}
              role={'presentation'}
            >
              {item.name}
            </li>
          );
        }
        return (
          <li
            key={i}
            className={classNames(styles.list, item === this.state.selected ? styles.active : '')}
            onClick={event => this.onSelect(event, item)}
            role={'presentation'}
          >
            {item}
          </li>
        );
      });
    return (
      <div
        role={'button'}
        tabIndex={0}
        className={classNames(styles.dropdownTextSelected, menuClassName, {
          [styles.dropdownActive]: this.state.dropdownOpen,
          [styles.disabled]: isDisabled,
        })}
        onClick={() => {
          this.setState({ dropdownOpen: !this.state.dropdownOpen });
        }}
      >
        <span className={'fLeft'}>
          {typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.name}
        </span>
        <i className={classNames(styles.dropdownArrow, 'fRight', 'material-icons')}>
          arrow_drop_up
        </i>
        <div className={'clearall'} />
        {this.state.dropdownOpen && (
          <ul className={classNames('dropdown', styles.dropdownMenu)}>{menuItems}</ul>
        )}
      </div>
    );
  }
}

export default DropdownMenu;

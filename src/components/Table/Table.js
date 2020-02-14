import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import Immutable from 'immutable';
import HeaderBtn from './HeaderBtn';
import styles from './Table.css';

const headerLabelsMap = {
  'Campaign Name': 'name',
  Start: 'start_date',
  End: 'end_date',
  Promos: 'promos',
  Spend: 'spend',
  Served: 'served',
  Contracted: 'contracted',
  '%Served': '%saved',
  Impressions: 'impressions',
  Engagements: 'engagements',
};

class Table extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Immutable.List).isRequired,
  };
  static defaultProps = {
    tableBody: [],
    tableHeaders: [],
    columnWidths: [],
  };

  constructor(props) {
    super(props);
    const data = !this.props.data ? [] : this.props.data.toJS();
    this.state = {
      data,
      isExpanded: new Array(data.length).fill(false),
      sortField: null,
      isAsc: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.data.length === 0) {
      this.setState({ data: !nextProps.data ? [] : this.props.data.toJS() });
    }
  }

  sortFn = sortLabel => {
    let sortedArray;
    if (this.state.data.length === 0) {
      return;
    }
    const { data } = this.state;
    let sortField = headerLabelsMap[sortLabel];
    let isAsc;
    switch (sortLabel) {
      case 'Campaign Name': {
        isAsc = this.state.sortField === 'name' && this.state.isAsc === true;
        isAsc = !isAsc;
        if (isAsc) {
          sortedArray = data
            .slice()
            .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1));
        } else {
          sortedArray = data
            .slice()
            .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
        }
        break;
      }
      case 'Start':
      case 'End': {
        // const field = `${sortLabel.toLowerCase()}_date`;
        isAsc = this.state.sortField === sortField && this.state.isAsc === true;
        isAsc = !isAsc;
        if (isAsc) {
          sortedArray = data
            .slice()
            .sort((a, b) => new Date(a[sortField]) - new Date(b[sortField]));
        } else {
          sortedArray = data
            .slice()
            .sort((a, b) => new Date(b[sortField]) - new Date(a[sortField]));
        }
        break;
      }
      default: {
        isAsc = this.state.sortField === 'promos' && this.state.isAsc === true;
        isAsc = !isAsc;
        if (isAsc) {
          sortedArray = data
            .slice()
            .sort((a, b) => (a.promotions.length > b.promotions.length ? -1 : 1));
        } else {
          sortedArray = data
            .slice()
            .sort((a, b) => (b.promotions.length > a.promotions.length ? -1 : 1));
        }
        sortField = 'promos';
        break;
      }
    }
    const isExpanded = new Array(sortedArray.length).fill(false);
    this.setState({ data: sortedArray, isAsc, sortField, isExpanded });
  };

  handleRowExpand = index => {
    const isExpanded = [...this.state.isExpanded];
    isExpanded[index] = !isExpanded[index];
    this.setState({ isExpanded });
  };

  render() {
    const { data, isExpanded } = this.state;
    if (!data) return null;
    return (
      <div className={styles.table}>
        <div className={styles.headerRow}>
          {Object.keys(headerLabelsMap).map(label => (
            <HeaderBtn
              key={label}
              label={label}
              sortFn={this.sortFn}
              isAsc={this.state.isAsc}
              isSortActive={headerLabelsMap[label] === this.state.sortField}
            />
          ))}
        </div>
        {data.map((item, i) => (
          <div key={item.id}>
            <div className={styles.row} style={{ fontWeight: isExpanded[i] ? 'bold' : '' }}>
              <div className={styles.rowMargin}>
                {item.promotions.length > 0 && (
                  <i
                    className={classNames(styles.icon, 'material-icons')}
                    onClick={() => this.handleRowExpand(i)}
                    role={'button'}
                    tabIndex={0}
                  >
                    {isExpanded[i] ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
                  </i>
                )}
              </div>
              <div>{item.name}</div>
              <div>{moment(item.start_date).format('L')}</div>
              <div>{moment(item.end_date).format('L')}</div>
              <div>{item.promotions.length}</div>
              <div>{item.spend_to_date}</div>
              <div>{item.units_served}</div>
              <div>{item.units_contracted}</div>
              <div>{item.percent_served}</div>
            </div>
            {item.promotions.length > 0 &&
              isExpanded[i] && (
                <div className={classNames(styles.openSub)}>
                  <div>
                    <span className={styles.sortArrows} style={{ visibility: 'hidden' }} />
                  </div>
                  {item.promotions.map(promoItem => (
                    <div
                      key={promoItem.id}
                      className={styles.row}
                      style={{ backgroundColor: '#f6f6f6' }}
                    >
                      <div className={styles.rowMarginInner} />
                      <div>{promoItem.name}</div>
                      <div>{moment(promoItem.start_date).format('L')}</div>
                      <div>{moment(promoItem.end_date).format('L')}</div>
                      <div>{promoItem.format.type}</div>
                      <div>{promoItem.spend_to_date}</div>
                      <div>{promoItem.units_served}</div>
                      <div>{promoItem.units_contracted}</div>
                      <div>{promoItem.percent_served}</div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  }
}

export default Table;

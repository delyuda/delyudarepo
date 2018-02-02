import React from 'react';
import './GroupList.css';

import Group from '../group/Group';
import { loadData } from '../../actions';

class GroupList extends React.Component{
    componentDidMount () {
        const { dispatch } = this.props;

        dispatch(loadData());
    }

    render () {
        const groupList = this.props.data.data.map(item =>
            <Group key={item.id.toString()} {...item} />
        );

        return (
            <div className="group-list">
                {groupList}
            </div>
        );
    }
}

export default GroupList;
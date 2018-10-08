import React from 'react'
import './Suggestions.css'

const ListItem = ({value, onClick}) => (
    <li onClick={onClick}>{value}</li>
)

const List = ({items, onItemClick}) => (
    <div className="scroller">
        <ul>
            {items ? items.map((item) => <ListItem key={item.id} value={item.value}
                                                   onClick={onItemClick.bind(this, item.id, item.value)}/>) : null}
        </ul>
    </div>
)

class Suggestions extends React.Component {
    handleSelect = (id, value) => {
        this.props.handlePickedSuggestion(this.props.name, value, id)
    }

    render() {
        return this.props.suggestions.length > 0 ? <List items={this.props.suggestions} onItemClick={this.handleSelect}/> : null
    }
}

export default Suggestions

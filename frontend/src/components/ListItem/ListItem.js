import React from 'react';
import './ListItem.css';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            checked: props.checked,
            content: props.content,
            getList: props.getList,
            edited: false,
        };

        // Bind functions
        this.inputChange = this.inputChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    // Edit the todoText
    inputChange(event) {
        this.setState({
            content: event.target.value,
            edited: true
        });
    }

    // Toggle the checkbox
    checkboxChange(event) {
        this.setState({
            checked: !this.state.checked
        });

        fetch(document.location.href + 'api/checkItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.state.id }),
        });

    }

    // Delete the todo item from the server
    deleteItem() {
        fetch(document.location.href + 'api/deleteItem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.state.id }),
        }).then(() => {
            this.props.getList();
        });
    }

    // Save changes to an item
    saveItem() {
        fetch(document.location.href + 'api/saveItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: this.state.content,
                id: this.state.id
            }),
        }).then(() => {
            this.setState({ edited: false });
        });
    }

    render() {
        return (
            <div className={`${'ListItem'} ${((this.props.filter === this.state.checked) ? 'filtered' : '')}`}>

                {/* Checkbox */}
                <input
                    type='checkbox' className='checkbox'
                    checked={this.state.checked}
                    onChange={this.checkboxChange}>
                </input>

                {/* Text for the to-do item */}
                <input
                    type='text'
                    className='TodoText'
                    value={this.state.content}
                    onChange={this.inputChange}>
                </input>

                {/* Buttons to manage the item */}
                <button
                    className='SaveButton'
                    disabled={!this.state.edited}
                    onClick={this.saveItem}>
                    Save
                </button>
                <button
                    className='DeleteButton'
                    onClick={this.deleteItem}>
                    Delete
                </button>
            </div>
        );
    }
}

export default ListItem;
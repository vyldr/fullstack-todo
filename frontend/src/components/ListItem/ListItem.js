import React from 'react';

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
        this.handleChange = this.handleChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    // Edit the todoText
    handleChange(event) {
        this.setState({
            content: event.target.value,
            edited: true
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
            <div className='ListItem'>

                {/* Text for the to-do item */}
                <input type='text'
                    value={this.state.content}
                    onChange={this.handleChange}>
                </input>

                {/* Buttons to manage the item */}
                <button>Done</button>
                <button
                    disabled={!this.state.edited}
                    onClick={this.saveItem}>
                    Save
                </button>
                <button onClick={this.deleteItem}>Delete</button>
            </div>
        );
    }
}

export default ListItem;
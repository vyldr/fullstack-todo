import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            checked: props.checked,
            content: props.content,
            getList: props.getList,
        };

        // Edit the text box
        this.handleChange = this.handleChange.bind(this);

        this.deleteItem = this.deleteItem.bind(this);
    }

    // Update the todoText
    handleChange(event) {
        this.setState({ content: event.target.value });
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
                <button>Save</button>
                <button>Edit</button>
                <button onClick={this.deleteItem}>Delete</button>
            </div>
        );
    }
}

export default ListItem;
import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            todoText: '',
        };

        // Edit the text box
        this.handleChange = this.handleChange.bind(this);
    }

    // Update the todoText
    handleChange(event) {
        this.setState({ todoText: event.target.value });
    }

    render() {
        return (
            <div>

                {/* Text for the to-do item */}
                <input type='text'
                    value={this.state.todoText}
                    onChange={this.handleChange}>
                </input>

                {/* Buttons to manage the item */}
                <button>Done</button>
                <button>Save</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        );
    }
}

export default ListItem;
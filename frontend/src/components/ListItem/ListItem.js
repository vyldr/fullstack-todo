import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            checked: props.checked,
            content: props.content,
        };

        // Edit the text box
        this.handleChange = this.handleChange.bind(this);
    }

    // Update the todoText
    handleChange(event) {
        this.setState({ content: event.target.value });
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
                <button>Delete</button>
            </div>
        );
    }
}

export default ListItem;
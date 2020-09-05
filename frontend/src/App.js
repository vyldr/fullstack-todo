import React from 'react';
import './App.css';

import ListItem from './components/ListItem/ListItem';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getList();
    }

    // Get the list of todos from the server
    getList() {
        fetch(document.location.href + 'api/todos')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        items: result
                    });
                },
            )
    }

    render() {
        return (
            <div className='App'>
                <h1>To-Do List</h1>

                {/* Create an entry for each todo item */}
                <div className='List'>
                    {this.state.items.map(item => (
                        <ListItem
                            key={item.item_id}
                            id={item.item_id}
                            checked={item.checked}
                            content={item.content}
                        />
                    ))}
                </div>
            </div>
        );
    }

}
export default App;

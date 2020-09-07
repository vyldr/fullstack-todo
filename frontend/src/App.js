import React from 'react';
import './App.css';

import ListItem from './components/ListItem/ListItem';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filter: null
        };

        // Bind functions
        this.addItem = this.addItem.bind(this);
        this.getList = this.getList.bind(this);
        this.setFilter = this.setFilter.bind(this);
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
                    result.sort((a, b) => a.item_id - b.item_id);
                    console.log(result);
                    this.setState({
                        items: result
                    });
                },
            )
    }

    addItem() {
        fetch(document.location.href + 'api/addItem')
            .then(() => {
                this.getList();
            });
    }

    // Set which items to filter
    setFilter(filter) {
        this.setState({ filter: filter });
    }

    render() {
        return (
            <div className='App'>
                <h1>To-Do List</h1>

                <div className='FilterButtons'>
                    <button onClick={() => this.setFilter(null)}>All</button>
                    <button onClick={() => this.setFilter(false)}>Checked</button>
                    <button onClick={() => this.setFilter(true)}>Unchecked</button>
                </div>

                {/* Create an entry for each todo item */}
                <div className='List'>
                    {this.state.items.map(item => (
                        <ListItem
                            key={item.item_id}
                            id={item.item_id}
                            checked={item.checked}
                            content={item.content}
                            filter={this.state.filter}
                            getList={this.getList}
                        />
                    ))}
                </div>
                <button onClick={this.addItem} >Add</button>
            </div>
        );
    }

}
export default App;

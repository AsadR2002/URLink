import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import getCurrentTab from "./background.js";

function CrossButton(props) {
    return (
        <Button type="button" className="close" aria-label="Close" onClick={() => props.removeItem(props.itemKey)}>
            <span aria-hidden="true">&times;</span>
        </Button>
    );
}

//link button function - to create the button
// function LinkButton(props) {
//     return (
//         <Button type="button" className="____" aria-label="____" onClick={() => props._____(props.itemKey)}>
//             <span aria-hidden="true">&times;</span>
//         </Button>
//     );
// }

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todoListItems: [], item: { name: "", url: "" }, currItemName: "" };
    }
    componentDidMount() {
        chrome.storage.local.get(["todoListItems"], (result) => {
            const todoListItems = result.todoListItems || [];
            this.setState({ todoListItems });
        });
    }
    removeItem(key) {
        this.setState((prevState) => {
            let items = prevState.todoListItems;
            items.splice(key, 1);
            chrome.storage.local.set({ todoListItems: items });
            return { todoListItems: items };
        });
    }
    addItem() {
        if (!this.state.item) return;
        this.setState((prevState) => {
            let items = prevState.todoListItems;
            var activeTabUrl = "";

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                // since only one tab should be active and in the current window at once
                // the return variable should only have one entry
                var activeTab = tabs[0];
                activeTabUrl = activeTab.url;
            });

            prevState.item.url = activeTabUrl;

            items.push(prevState.item);

            chrome.storage.local.set({ todoListItems: items });
            return { todoListItems: items };
        });
    }

    //link router function - takes user to link
    open() {
        var newURL = "http://stackoverflow.com/";
        chrome.tabs.create({ url: newURL });
    }

    render() {
        return (
            <div className="card todo-list-container">
                <div className="card-header">
                    <h3 className="card-title">Todo List</h3>
                </div>
                <div className="card-body">
                    <ListGroup className="todo-list">
                        {this.state.todoListItems.length === 0 ? (
                            <p>Source list is empty.</p>
                        ) : (
                            this.state.todoListItems.map((l, i) => (
                                <ListGroup.Item onClick={this.open} key={i}>
                                    {`${i + 1}) ${l}`}
                                    <CrossButton itemKey={i} removeItem={this.removeItem.bind(this)} />
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </div>

                <div className="card-footer">
                    <InputGroup className="mb-3">
                        <FormControl
                            value={this.state.name}
                            placeholder="Site Name"
                            aria-label="Site Name"
                            aria-describedby="basic-addon2"
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                        <InputGroup.Append>
                            <Button disabled={!this.state.name} variant="primary" onClick={this.addItem.bind(this)}>
                                Add
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        );
    }
}

export default TodoList;

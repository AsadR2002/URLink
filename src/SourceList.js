import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// import open from "./background.js";
import logo from "./assets/img/logo.png";

function CrossButton(props) {
    return (
        <Button
            type="button"
            className="close closeButton"
            aria-label="Close"
            onClick={() => props.removeItem(props.itemKey)}
        >
            <span aria-hidden="true">&times;</span>
        </Button>
    );
}

//link button function - to create the button
function LinkButton(props) {
    return (
        <Button
            type="button"
            className="go-button btn btn-secondary"
            class="btn btn-secondary"
            aria-label="Open"
            onClick={() => props.open(props.itemLink)}
        >
            <span aria-hidden="true">GO</span>
        </Button>
    );
}

class SourceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sourceListItems: [], item: { name: "", linkSite: "" }, currItemName: "", currItemLink: "" };
    }
    componentDidMount() {
        chrome.storage.local.get(["sourceListItems"], (result) => {
            const sourceListItems = result.sourceListItems || [];
            this.setState({ sourceListItems });
        });
    }
    removeItem(key) {
        this.setState((prevState) => {
            let items = prevState.sourceListItems;
            items.splice(key, 1);
            chrome.storage.local.set({ sourceListItems: items });
            return { sourceListItems: items };
        });
    }

    addItem() {
        if (!this.state.currItemName) return;
        this.setState((prevState) => {
            let items = prevState.sourceListItems;
            prevState.item.name = prevState.currItemName;

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                // since only one tab should be active and in the current window at once
                // the return variable should only have one entry
                var activeTab = tabs[0];
                prevState.item.linkSite = activeTab.url;
                items.push(prevState.item);
            });

            chrome.storage.local.set({ sourceListItems: items });
            return { sourceListItems: items };
        });
    }

    //link router function - takes user to link in new tab
    open(item) {
        chrome.tabs.create({ url: item });
    }

    render() {
        return (
            <div className="card source-list-container">
                <div className="card-header">
                    <img class="title-icon" src={logo} alt="logo"></img>
                </div>
                <div className="card-body">
                    <ListGroup className="source-list">
                        {this.state.sourceListItems.length === 0 ? (
                            <p>Source list is empty.</p>
                        ) : (
                            this.state.sourceListItems.map((l, i) => (
                                <ListGroup.Item key={i}>
                                    <LinkButton itemLink={l.linkSite} open={this.open.bind(this)} />
                                    {`${l.name}`}
                                    <CrossButton itemKey={i} removeItem={this.removeItem.bind(this)} />
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </div>

                <div className="card-footer">
                    <InputGroup className="mb-3">
                        <FormControl
                            value={this.state.currItemName}
                            placeholder="Site Name"
                            aria-label="Site Name"
                            aria-describedby="basic-addon2"
                            onChange={(e) => this.setState({ currItemName: e.target.value })}
                        />
                        <InputGroup.Append>
                            <Button
                                disabled={!this.state.currItemName}
                                className="btn btn-danger"
                                onClick={this.addItem.bind(this)}
                            >
                                Add
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        );
    }
}

export default SourceList;

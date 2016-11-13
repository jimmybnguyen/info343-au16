class SavedResults extends React.Component {
    render() {
        return(
            <div>
                <h3>My Locations</h3>

                <ul className="list-group">
                    {
                        this.props.saved.map((result) => (
                            <li className="list-group-item" key={result}>
                                <a href="#" onClick={(e) => this.onSavedClick(e, result)}>          {result}
                                </a>
                                <a href="#" className="right" onClick={(e) => this.onRemoveClick(e, result)}>          Remove
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
    
    onSavedClick(e, result) {
        e.preventDefault();

        this.props.clickSaved(result);
    }

    onRemoveClick(e, result) {
        e.preventDefault();

        this.props.clickedRemove(result);
    }
}
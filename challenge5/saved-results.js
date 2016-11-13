class SavedResults extends React.Component {
    render() {
        return(
            <ul>
                {
                    this.props.saved.map((result) => (
                        <li key={result}>
                            <a href="#" onClick={(e) => this.onSavedClick(e, result)}>          {result}
                            </a>
                        </li>
                    ))
                }
            </ul>
        )
    }
    
    onSavedClick(e, result) {
        e.preventDefault();
        
        this.props.onClick(result);
    }
}
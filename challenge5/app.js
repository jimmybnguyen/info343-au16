var API_KEY = '00cc3cb930fb919aa6a40b719d8ef9fd';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    
    componentDidMount() {
        var savedResultsJSON = localStorage.getItem('savedResults')
        var savedResults = JSON.parse(savedResultsJSON);
        
        if (savedResults) {
            this.setState({
                saved: savedResults
            });
        }
        
        // Shows the weather info for first saved city on page load
        if (savedResults.length !== 0) {
            this.searchLocation(savedResults[0]);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>Weather Boot</h1>
                    </div>
                </div>
            
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <form onSubmit={(e) => this.onSearch(e)}>
                            <input className="form-control" type="text" ref="query" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <SavedResults
                            saved={this.state.saved}
                            clickSaved={(result) => this.searchLocation(result)}
                            clickedRemove={(result) => this.removeLocation(result)}
                        />
                    </div>
                </div>
                <div className="row">
                    <Result
                        name={this.state.name}
                        temp={this.state.temp}
                        icon={this.state.icon}
                        main={this.state.main}
                        description={this.state.description}
                        onSave={(name) => this.saveResult(name)}
                    /> 
                </div>
        </div>
        );
    }
    
    removeLocation(location) {
        var saved = this.state.saved;
        
        // http://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
        // Finds the index that matches the location, then removes it
        for (var i=saved.length-1; i>=0; i--) {
            if (saved[i] === location) {
                saved.splice(i, 1);
            }
        }
        
        this.setState({
            saved: saved
        });
        
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedResults', savedJson);
    }
    
    saveResult(name) {
        var saved = this.state.saved;
        
        saved.push(name);
        
        this.setState({
            saved: saved
        });
        
        // Save to local storage
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedResults', savedJson);
    }
    
    onSearch(e) {
        e.preventDefault();
        
        var queryValue = this.refs.query.value;
        
        this.searchLocation(queryValue);
    }

    searchLocation(location) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + API_KEY; 
        
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then((json) => {
            
            var name = json.name;
            var temp = numeral(json.main.temp).format('0,0') + "°";
            var icon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
            var main = json.weather[0].main;
            var description = "(" + json.weather[0].description + ")";
            
            this.setState({
                name: name,
                temp: temp,
                icon: icon,
                main: main,
                description: description
            });
        })
        .catch(function(error) {
              console.log("Failed!", error);
        });
    }
}


var app = document.getElementById('app');

ReactDOM.render(<App />, app);

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
        
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var geoCoordinates = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
                        this.searchLocation(geoCoordinates);
                });
        // If no geolocation, shows first saved location if it exist
        } else if (savedResults.length !== 0) {
            this.searchLocation(savedResults[0]);
        }
        
    }

    render() {
        return (
            <div className="container">
                <h1>Weather Boot</h1>

                <div className="row">
                    <div className="col-sm-6">
                        <Search
                            onSearch={(queryValue) => this.searchLocation(queryValue)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <SavedResults
                            saveTitle={this.state.saveTitle}
                            saved={this.state.saved}
                            clickSaved={(result) => this.searchLocation(result)}
                            clickedRemove={(result) => this.removeLocation(result)}
                        />
                    </div>
                </div>
                        
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        {
                            this.state.name ? (
                                <Result
                                    name={this.state.name}
                                    temp={this.state.temp}
                                    icon={this.state.icon}
                                    main={this.state.main}
                                    description={this.state.description}
                                    onSave={(name) => this.saveResult(name)}
                                /> 
                            ) : null 
                        }
                    </div>
                    
                    <div className="col-md-6 col-sm-6">
                        {
                            this.state.name ? (
                            <Details
                                tempLow={this.state.tempLow}
                                tempHigh={this.state.tempHigh}
                                humidity={this.state.humidity}
                                pressure={this.state.pressure}
                                sunrise={this.state.sunrise}
                                sunset={this.state.sunset}
                                speed={this.state.speed}
                                direction={this.state.direction}
                            />
                            ) : null
                        }
                    </div>
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
        
        if (saved.length == 0) {
            this.setState({
                saveTitle: null
            });
        }
        
        this.setState({
            saved: saved
        });
        
        
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedResults', savedJson);
    }
    
    saveResult(name) {
        var saved = this.state.saved;
        if (saved.indexOf(name) === -1) {
            saved.push(name);

            this.setState({
                saved: saved
            });

            // Save to local storage
            var savedJson = JSON.stringify(saved);
            localStorage.setItem('savedResults', savedJson);
        } else {
            // error location already saved
        }
    }

    searchLocation(location) {
        var url = "http://api.openweathermap.org/data/2.5/weather?" + location + "&units=imperial&appid=" + API_KEY; 
        
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            var name = json.name;
            var temp = numeral(json.main.temp).format('0,0') + "°F";
            var icon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
            var main = json.weather[0].main;
            var description = "(" + json.weather[0].description + ")";
            var tempLow = json.main.temp_min + "°F";
            var tempHigh = json.main.temp_max + "°F";
            var humidity = json.main.humidity + "%";
            var pressure = json.main.pressure + " hpa";
            var sunrise = moment.unix(json.sys.sunrise).format("h:mm a");
            var sunset = moment.unix(json.sys.sunset).format("h:mm a");
            var speed = json.wind.speed + " mph"
            var dir = direction(json.wind.deg) + " (" + json.wind.deg + ")";
            
            this.setState({
                name: name,
                temp: temp,
                icon: icon,
                main: main,
                description: description,
                tempLow: tempLow,
                tempHigh: tempHigh,
                humidity: humidity,
                pressure: pressure,
                sunrise: sunrise,
                sunset: sunset,
                speed: speed,
                direction: dir
            });
        })
        .catch(function(error) {
              console.log("Failed!", error);
        });
    }
}


var app = document.getElementById('app');

ReactDOM.render(<App />, app);

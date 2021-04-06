import { useState, useEffect } from "react";
import axios from 'axios'

const Languages = ({languagesList}) =>{
    return (
        <ul>
            {
                languagesList.map(
                    lang => <li key={lang.name}>{lang.name}</li>
                )
            }
        </ul>
    )
}

const CountryData = ({country}) =>{
    return (
        <div>
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>populaion {country.population}</p>

                <h3>Languages</h3>
                <Languages languagesList={country.languages}></Languages>

                <img src={country.flag} alt="country" style={{maxWidth:"200px"}}></img>
            </div>
        </div>
    )
}

const SingleCountry = ({country}) => {
    const capital = country.capital;
    const [weatherData, setWeatherData] = useState(null);

    const url = `http://api.weatherstack.com/current?access_key=3f49b0b919474af1c1866d6e25ed25e6&query=${capital}`;

    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            console.log("weather", response.data);

            setWeatherData(response.data.current);
        })
    }, [])

    let weatherContent = <div></div>;

    if (weatherData !== null && typeof weatherData !== 'undefined'){
        console.log("weather", weatherData);

        weatherContent = 
        <div>
            <p><b>temperature: </b> {weatherData.temperature} Celcius</p>
            <img src={weatherData.weather_icons[0]}></img>
            <p><b>wind: </b> {weatherData.wind_speed} mph direction {weatherData.wind_dir}</p>
        </div>
    }


    return (
        <div>
            <CountryData country={country}></CountryData>
            <h3>Weather in {capital}</h3>
            {weatherContent}
        </div>
    );
}

const Country10List = ({list}) => {
    const [showCountries, setShowCoutries] = useState(
        list.map(country => (
            {name:country.name,
            state: 0}
        )));

    
    const changeCountryState = (name) =>{

        let copyShowCountries = [...showCountries];

        copyShowCountries.forEach((country) =>{
            if (country.name === name){
                country.state = !country.state;
            }
        })

        setShowCoutries(copyShowCountries);

    }

    
    return (
        <div>
            {list.map(country => {
                const state = showCountries.find(c => c.name === country.name).state;
                const content = <>
                    <span>{country.name}</span>
                    <button onClick={() => changeCountryState(country.name)}>show</button>
                    <br></br>
                </>

                let data = <></>;

                if (state){
                    data = <CountryData country={country}></CountryData>
                }

                return (
                    <div>
                        {content}
                        {data}
                    </div>
                )             
            })
            }
        </div>
    )
}

const CountriesList = (props) => {
    const {list} = props;


    const len = list.length;

    let content;

    if (len > 10){
        content = <div> Too many matches, specify another filter</div>;     
    } else if (len === 1) {
        const country = list[0];
        content = <SingleCountry country={country}></SingleCountry>       
    }
    else {
        content = <Country10List list={list}></Country10List>;
    }

    return (
        <>
            {content}
        </>
    );
}

export default CountriesList;
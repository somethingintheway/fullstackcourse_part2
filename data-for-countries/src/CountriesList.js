import { useState } from "react";

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
                console.log("country ", country.name);
                console.log('show count', showCountries)
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
        content = <CountryData country={country}></CountryData>       
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
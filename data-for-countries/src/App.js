import axios from 'axios';
import {useState, useEffect} from "react";
import CountriesList from './CountriesList'



function App() {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      const data = response.data;
      setCountries(data);
    })

  }, []);

  const lengthCountryList = countries.length;

  const handleChangeKeyword = (event) =>{
    setKeyword(event.target.value);
  }

  const filterCountryList = (list, keyword) =>{
    let filteredList;

    if (keyword.length === 0){
        filteredList = list;
    }
    else {

        const lowerKey = keyword.toLowerCase();
        
        filteredList = list.filter(country => {
            const countryName = country.name.toLowerCase();
            return countryName.includes(lowerKey);
        });
    }
    return filteredList;
  }

  return (
    <div>
      find countries
      <input 
        value={keyword}
        onChange={handleChangeKeyword}
      ></input>
      <CountriesList list={filterCountryList(countries, keyword)}></CountriesList>
    </div>
  );
}

export default App;

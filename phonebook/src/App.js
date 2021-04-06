import React, { useState } from 'react'
import Numbers from './componets/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value);
  }

  const addPerson = (event) =>{
    event.preventDefault();
    
    if (checkIfPersonExist(persons, newName)){
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const filetedPersons = () => {
    if (filter.length === 0)
    {
      return persons;
    }

    return persons.filter(person => {
      return person.name.toLocaleLowerCase().includes(filter);
    })
  }

  const checkIfPersonExist = (personArray, personName) =>{
    return personArray.filter(p => p.name === personName).length > 0;
  }

  return (
    <div>
      <h2>Phonebook</h2>

      filter shown with
      <input value={filter} onChange={handleFilterChange}>
      </input>

      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Numbers numbers={filetedPersons()}></Numbers>
    </div>
  )
}

export default App
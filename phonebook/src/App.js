import React, { useState, useEffect } from 'react'
import Numbers from './componets/Numbers'
import personService from "./services/personsServer";
import Notification from './componets/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('green');


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
    
    let person = checkIfPersonExist(persons, newName);
    console.log("person", typeof person !== 'undefined')
    if (typeof person !== 'undefined'){
      const msg = `${newName} is already added to the phonebook, replace the old number with a new one?`;
      if (window.confirm(msg)){
        const newPerson = {...person, number:newNumber}
        personService
        .updatePerson(person.id, newPerson)
        .then(
          returedPerson => {
            setPersons(persons.map(p => p.id !== returedPerson.id ? p : returedPerson))
          }
        )
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personService
    .addPerson(newPerson)
    .then(returedPerson =>{
      setPersons(persons.concat(returedPerson));
      setNotificationMessage(`Added ${returedPerson.name}`);
      setMessageColor('green');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    })


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
    return personArray.find(p => p.name === personName);
  }

  const deletePerson = (id, name) => {
    personService
    .deletePerson(id)
    .then(
      setPersons(persons.filter(p => p.id !== id))
    )
    .catch(
      (error) =>{
        setNotificationMessage(`Information of ${name} has already been removed from the server`);
        setMessageColor('red');

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      }
    )
  }

  useEffect(() =>{
    personService
    .getAll()
    .then(returnedPersons => {
      setPersons(returnedPersons);
    })
  },[]);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} color={messageColor}></Notification>

      filter shown with
      <input value={filter} onChange={handleFilterChange}>
      </input>

      <h2>add a new</h2>


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
      <Numbers numbers={filetedPersons()} deletePerson={deletePerson}></Numbers>
    </div>
  )
}

export default App
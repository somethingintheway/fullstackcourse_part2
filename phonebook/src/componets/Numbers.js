

const Numbers = (props) => {
    const {numbers, deletePerson} = props;

    const handleClickDelete = (id, name) => {
        if(window.confirm(`Delete ${name}?`)){
            deletePerson(id, name);
        }
    }


    return (
    <ul>
        {numbers.map(number => {
            return (
            <li key={number.name}>{number.name} {number.number} <button onClick={() => handleClickDelete(number.id, number.name)}>delete</button></li>
            )
        })}
    </ul>
    )
};

export default Numbers;
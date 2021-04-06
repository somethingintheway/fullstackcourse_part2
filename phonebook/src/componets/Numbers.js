const Numbers = (props) => {
    console.log('here', props);
    const {numbers} = props;
    return (
    <ul>
        {numbers.map(number => {
            return (
            <li key={number.name}>{number.name} {number.number}</li>
            )
        })}
    </ul>
    )
};

export default Numbers;
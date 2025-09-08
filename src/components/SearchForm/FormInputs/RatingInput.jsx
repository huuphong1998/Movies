const RatingInput = ({ onChange, name }) => {
    return (
        <select name={name} onChange={onChange} className="rounded border">
            <option value="all">All</option>
            <option value="0 - 49">0 - 49</option>
            <option value="50 - 69">50 - 69</option>
            <option value="70 - 100">70 - 100</option>
        </select>
    );
};

export default RatingInput;

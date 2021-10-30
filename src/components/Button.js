import PropTypes from 'prop-types'
function Button({text,onClick,className}) {
    
    return (
        <button onClick={onClick} className={className}>{text}</button>
    )
}


Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default Button

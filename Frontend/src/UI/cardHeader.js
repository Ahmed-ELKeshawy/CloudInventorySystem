const cardHeader = (props) =>{
    return(
        <div className="flex item-center justify-center bg-white w-full">
            {props.children}
        </div>
    )
}
export default cardHeader
const card = (props)=>{
    return(
        <div className="flex flex-col items-center gap-8 rounded-xl bg-slate-200 w-[200px] h-[300px] aspect-square overflow-hidden">
            {props.children}
            </div>
    )
}
export default card;
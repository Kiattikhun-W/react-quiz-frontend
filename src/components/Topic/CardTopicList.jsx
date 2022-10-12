const CardTopicList = ({name, id}) => {
    return (
        <div>
            <div
                className="flex items-center mt-2  justify-center px-5 py-3 text-base font-medium leading-6 text-black whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none">
                {name}
            </div>
        </div>
    )
}
export default CardTopicList
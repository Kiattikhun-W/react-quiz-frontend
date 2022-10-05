const CardTopicList = ({name, id}) => {
    return (
        <div
            className={'bg-gradient-to-l from-purple-400 to-pink-600 md:px-20 px-6 py-2 md:py-5 mt-5 rounded-full  hover:bg-gradient-to-r hover:cursor-pointer hover:scale-110'}>
            <p className={' text-2xl text-white text-center'}>{name}</p>
        </div>
    )
}
export default CardTopicList
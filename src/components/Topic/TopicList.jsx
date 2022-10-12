import CardTopicList from "./CardTopicList.jsx";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import * as api from '../Api/topicApi.js'

const TopicList = () => {
    const {data, isLoading, isError, error} = useQuery(['topics'], api.getTopics)
    if (isLoading) return <p className={'text-4xl text-white text-center'}>Loading</p>
    if (isError) return <p className={'text-4xl text-white text-center'}> no data found</p>


    return (
        <div>
            <div className={'grid place-content-center   '}>
                {data?.map(({id, topic_name}) => {
                    return (
                        <Link key={id} to={`/assessment/${id}`}>
                            <CardTopicList name={topic_name}/>
                        </Link>

                    )
                })}
            </div>
        </div>)
}
export default TopicList
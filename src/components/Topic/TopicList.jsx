import CardTopicList from "./CardTopicList.jsx";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import * as api from '../Api/topicApi.js'
import Lottie from "lottie-react";
import loading from "../../assets/loader.json"
import Loading from "../Base/Loading.jsx";

const TopicList = () => {
    const {data, isLoading, isError, error} = useQuery(['topics'], api.getTopics)


    // if (isLoading) return <div className={'grid place-items-center'}>{View}</div>
    if (isError) return <p className={'text-4xl text-white text-center'}> no data found</p>
    if (isLoading) return <Loading/>
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
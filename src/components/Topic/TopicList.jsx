import {useEffect, useState} from "react";
import axios from "axios";
import CardTopicList from "./CardTopicList.jsx";
import {Link} from "react-router-dom";

const TopicList = () => {
    const [data, setData] = useState([])


    const _fetchData = async () => {
        try {
            const topicData = await axios.get('http://localhost:3000/topic')

            setData(topicData.data)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        _fetchData()
    }, [])
    return (
        <div>
            <div className={'grid place-content-center   '}>
                {data.map(({id, topic_name}) => {
                    return (
                        <Link key={id} to={`/assessment/${id}`}>
                            <CardTopicList name={topic_name} id/>
                        </Link>
                    )
                })}
            </div>
        </div>)
}
export default TopicList
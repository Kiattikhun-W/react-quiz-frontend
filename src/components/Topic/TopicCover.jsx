import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import * as api from "../Api/topicApi.js";
import Loading from "../Base/Loading.jsx";

const beforeTest = [
    {id: 1, text: '- คุณสามารถทำแบบทดสอบนี้บนอุปกรณ์มือถือ อย่างไรก็ตาม เราขอแนะนำให้คุณทำบนคอมพิวเตอร์'},
    {id: 2, text: '- ในที่ปราศจากการถูกรบกวน เพื่อผลคะแนนที่ดีที่สุด'},
    {id: 3, text: '- หลังจากทำแบบทดสอบเสร็จ กรุณาเข้าสู่ระบบเพื่อดูผลคะแนน'}
]

const TopicCover = () => {
    let {topicId} = useParams();
    const [topicName, setTopicName] = useState('')
    const [subTopics, setSubTopics] = useState([])
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery(['topic', topicId], () => api.getTopic(topicId))


    useEffect(() => {
        if (data) {
            const {topic_name, subtopics} = data?.data[0];
            setTopicName(topic_name);
            setSubTopics(subtopics);
        }
    }, [data])
    if (isLoading) return <Loading/>
    if (isError) return <p className={'text-4xl text-white text-center'}> no data found</p>

    return (
        <div className={' grid place-content-center '}>
            <div className={'card mx-2 lg:mx-0 rounded-3xl mt-24 mb-2 p-[64px] font-sarabun'}>
                <div>
                    <h1 className={'text-4xl text-center font-extrabold '}>
                        {topicName}
                    </h1>
                </div>
                <div>
                    <h1 className={'text-lg font-bold'}>
                        ก่อนเริ่มทำแบบทดสอบ
                    </h1>
                    {beforeTest.map(({id, text}) => <p key={id}>{text}</p>)}

                </div>
                <div className={"mt-2 "}>
                    <h2 className={'text-lg font-bold'}> เนื้อหาครอบคลุมไปด้วย</h2>
                    <p className={'list-inside'}>
                        {subTopics.map(({subtopic_name, id}) =>
                            <li key={id}>
                                {subtopic_name}
                            </li>
                        )}
                    </p>
                </div>
                <div className={'text-center mt-4 '}>
                    <Link to={`/assessment/${topicId}/session`} state={true}>
                        <button
                            className="bg-yellow-500  hover:bg-yellow-700 text-white text-md font-bold py-3 px-9 rounded-full">
                            เริ่มทำแบบทดสอบ
                        </button>
                    </Link>

                </div>

            </div>
        </div>
    )
}
export default TopicCover
import {getMinuteFromSeconds} from "../../utils/index.js";
import ProgressBar from "@ramonak/react-progress-bar";

const HeaderBar = ({topicName, time, dataCount, progressBarNum, page, questionName}) => {
    return (
        <div className={'my-2'}>
            <div className={'flex justify-between'}>
                <div>
                    <h1 className={'text-2xl'}>
                        {/*{topicNameRef.current}*/}
                        {topicName}
                    </h1>
                </div>
                {/*<hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"/>*/}
                <div>
                    <h1 className={'font-bold text-2xl'}>
                        {getMinuteFromSeconds(time)}
                    </h1>
                </div>
            </div>
            <div>
                <ProgressBar
                    maxCompleted={dataCount}
                    completed={progressBarNum}
                    animateOnRender
                    bgColor="#8d8d8d"
                    isLabelVisible={false}
                />
            </div>
            <div>
                <h1 className={'text-2xl font-extrabold '}>Question {page}</h1>
                <h1 className={'text-left'}>{questionName}</h1>
            </div>
        </div>
    )
}
export default HeaderBar
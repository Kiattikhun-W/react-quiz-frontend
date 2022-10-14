import {getMinuteFromSeconds} from "../../utils/index.js";
import ProgressBar from "@ramonak/react-progress-bar";

const HeaderBar = ({name, time,}) => {
    return (
        <div className={'my-2'}>
            <div className={'flex justify-between'}>
                <div>
                    <h1 className={'text-2xl'}>
                        {/*{topicNameRef.current}*/}
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
                    // maxCompleted={data?.count}
                    // completed={progressBarRef.current}
                    animateOnRender
                    bgColor="#8d8d8d"
                    isLabelVisible={false}
                />
            </div>
        </div>
    )
}
export default HeaderBar
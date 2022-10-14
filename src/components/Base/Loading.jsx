import loading from "../../assets/loader.json";
import Lottie from "lottie-react";

const Loading = ({height = '200'}) => {
    return <Lottie className={`h-[200px]`} animationData={loading} loop={true}/>
}
export default Loading
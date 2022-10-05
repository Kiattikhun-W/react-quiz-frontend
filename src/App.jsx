import './App.css'
import Header from "./components/Header.jsx";
import TopicList from "./components/Topic/TopicList.jsx";

import {createBrowserRouter, Outlet, RouterProvider,} from "react-router-dom";
import TopicCover from "./components/Topic/TopicCover.jsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>

        </>
    );
};


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <TopicList/>,
                },
            ],
        },
        {
            path: "/assessment/:topicId",
            element: <TopicCover/>,

        },

    ]);


    return (
        <div>
            <RouterProvider router={router}/>

        </div>

    )
}

export default App

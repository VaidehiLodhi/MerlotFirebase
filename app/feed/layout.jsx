import { Navbar } from "../dashboard/_components/navbar";

const FeedLayout =({children})=> {
    return (
        <main>
            <Navbar/>
            {children}
        </main>
    )
}

export default FeedLayout;
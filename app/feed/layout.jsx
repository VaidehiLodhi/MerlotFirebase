import { Navbar } from "../dashboard/_components/navbar";

const FeedLayout =({children})=> {
    return (
        <main className="h-full w-full bg-[#2f0468]">
            <Navbar/>
            {children}
        </main>
    )
}

export default FeedLayout;
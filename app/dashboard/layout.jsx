import { DashboardForm } from "./_components/form";
import { Navbar } from "./_components/navbar";

const DashboardLayout =({children})=> {
    return (
        <main className="h-full w-full">
            <Navbar/>
            {children}
        </main>
    )
}

export default DashboardLayout;
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { DashboardForm } from "./form";

export const CreatePost =()=> {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full bg-white z-20 py-5 px-6 pt-24 shadow-sm">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger >
                    <div role="button" className="w-40 aspect-video relative bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
                        <p className="text-sm">Create New Post</p>
                    </div>
                    <DialogContent>
                        <DashboardForm/>
                        <DialogClose
                            onClick={() => setIsOpen(false)}
                            className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                        />
                    </DialogContent> 
                </DialogTrigger>  
            </Dialog> 
        </div>
    )
};
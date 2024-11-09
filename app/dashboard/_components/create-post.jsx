import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { DashboardForm } from "./form";
import { Pencil } from "lucide-react";

export const CreatePost = () => {
    const [isOpen, setIsOpen] = useState(false);

     const handleDialogClose = () => {
        setIsOpen(false);  
    };

    return (
        <div className="w-full pt-24 z-20 py-5 px-6 shadow-sm bg-customBlack">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <div role="button" className="w-40 aspect-video relative bg-customViolet rounded-sm flex gap-y-1 items-center justify-center hover:opacity-75 transition">
                        <Pencil className="h-4 w-4 mr-2" />
                        <p className="text-sm">
                            Create New Post
                        </p>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DashboardForm onFormSubmit={handleDialogClose}/>
                    <DialogClose
                        onClick={() => setIsOpen(false)}
                        className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

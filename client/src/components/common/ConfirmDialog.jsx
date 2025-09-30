import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ConfirmDialog = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisited");
        if (!hasVisited) {
            setOpen(true);
        }
    }, []);

    const handleConfirm = () => {
        localStorage.setItem("hasVisited", "true");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    if (!open) return null;

    return (
        <motion.div className="fixed inset-0 flex min-w-full items-end justify-center bg-black/60 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="relative bg-white/95 backdrop-blur-md border-t border-white/20 rounded-t-3xl shadow-2xl p-8 w-full" initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 text-yellow-600 mx-auto">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h2 className="mt-4 text-3xl font-bold text-gray-900 text-center">
                    Important Notice
                </h2>

                <p className="mt-3 text-lg text-gray-700 text-center leading-relaxed">
                    Since this project is deployed on <span className="font-semibold">Render</span>, API responses may take a few extra seconds when you first visit. Do you want to continue browsing?
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={handleCancel} className="px-6 py-2.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition" >
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md transition">
                        Continue
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmDialog;

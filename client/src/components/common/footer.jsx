import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
    return (
        <footer className=" text-primary">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Brand Section */}
                <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h2 className="text-3xl font-bold">NDevStore</h2>
                    <p className="mt-3 text-sm text-primary-foreground/80">
                        Ecommerce built by <span className="font-medium">Nishant Rathore</span>
                    </p>
                </motion.div>

                {/* Links Section */}
                <motion.div className="grid grid-cols-2 gap-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div>
                        <h3 className="font-semibold mb-3">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-secondary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Docs</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-secondary transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </motion.div>

                {/* Social Section */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <h3 className="font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <motion.a href="#" className="hover:text-secondary transition-colors" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                            <Twitter size={22} />
                        </motion.a>
                        <motion.a href="#" className="hover:text-secondary transition-colors" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                            <Facebook size={22} />
                        </motion.a>
                        <motion.a href="#" className="hover:text-secondary transition-colors" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                            <Instagram size={22} />
                        </motion.a>
                        <motion.a href="#" className="hover:text-secondary transition-colors" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                            <Github size={22} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <Separator className="bg-primary-foreground/20" />
            <motion.div className="py-4 text-center text-sm text-primary-foreground/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                © {new Date().getFullYear()} NDevStore. All rights reserved.
            </motion.div>
        </footer>
    );
};

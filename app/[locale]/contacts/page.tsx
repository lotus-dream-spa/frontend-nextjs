import type { Metadata } from "next";
import {
    NavbarElement,
    HeroElement,
    FooterElement
} from "@/components";
import Link from "next/link";
import { TextHoverElement } from "@/components";

export const metadata: Metadata = {
    title: "Contact Us | Lotus Dream SPA | Best olistic spa in Siem Reap",
    description: "Find us in the heart of Kandal Village. Contact Lotus Dream SPA for inquiries, directions, and the ultimate wellness experience at the best olistic spa in Siem Reap.",
};

export default function ContactsPage() {

    return (
        <>
            <div className="bg-lotus-blue w-full min-h-screen flex flex-col items-center justify-center padding-x gap-10">
                <NavbarElement />
                <HeroElement title="Contacts" hasSubtitle={false} />
            </div>
            <div className="w-full flex flex-col items-center justify-center mb-16 padding-x">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full lg:w-10/12 xl:w-9/12 mt-16">
                    
                    {/* Part 1: Map & Button */}
                    <div className="h-full flex flex-col items-center justify-between">
                        <div className="w-full h-[450px] relative rounded-3xl border-4 border-white overflow-hidden shadow-2xl group mb-16 lg:mb-0">
                            <iframe
                                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.8860290349226!2d103.85336747479921!3d13.357362206303943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31101764523865f3%3A0x44be57aa7e937a07!2sLotus%20Dream%20SPA!5e0!3m2!1sen!2skh!4v1767947565143!5m2!1sen!2skh"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" 
                            />
                        </div>
                        
                        <div className="group flex gap-2 items-center text-[17px] font-semibold capitalize text-[#260A2F] bg-secondary rounded-full leading-tight tracking-tight px-6 py-4 hover:scale-105 transition-transform duration-300 shadow-lg">
                            <Link href="https://www.google.com/maps/dir//Lotus+Dream+SPA/@13.3573622,103.8533675,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31101764523865f3:0x44be57aa7e937a07!2m2!1d103.8559424!2d13.3573622" className="w-44 text-center">
                                <TextHoverElement
                                    titile1="Get Directions"
                                    titile2="Open Maps"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Part 2: Opening Hours & Info */}
                    <div className="flex flex-col bg-lotus-light-gold backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-lotus-light-gold/30 shadow-xl justify-between min-h-[450px]">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">Wellness Sanctuary</span>
                                <h3 className="text-3xl lg:text-5xl font-agr text-lotus-dark-blue uppercase leading-none">Opening Hours</h3>
                            </div>

                            <div className="flex flex-col gap-6 font-ret">
                                <div className="flex flex-col lg:flex-row justify-between items-center lg:border-b border-lotus-blue/10 pb-4">
                                    <span className="text-2xl text-lotus-blue">Monday — Sunday</span>
                                    <span className="text-2xl font-bold text-white italic">10:00 — 21:00</span>
                                </div>
                                <p className="text-lotus-blue text-lg leading-relaxed max-w-md hidden lg:block">
                                    Step into our oasis of tranquility any day of the week. We recommend booking in advance to ensure your preferred time.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 lg:mt-0 pt-8 lg:border-t border-lotus-blue/10 flex flex-col gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white uppercase tracking-widest mb-1">Address</span>
                                <p className="text-xl text-lotus-blue font-ret italic">{process.env.NEXT_PUBLIC_STORE_ADDRESS}</p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white uppercase tracking-widest mb-1">Contact</span>
                                <p className="text-xl text-lotus-blue font-ret italic">{process.env.NEXT_PUBLIC_STORE_PHONE_NUMBER}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterElement />
        </>
    );
}

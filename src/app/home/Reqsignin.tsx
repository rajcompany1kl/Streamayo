'use client';

import { LogIn } from "lucide-react";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

export default function Reqsignin() {
    console.log("ma hi jjias")
    return (
        <div className="w-full flex items-center justify-center py-24">
            <div className="bg-white shadow-md border border-gray-200 rounded-3xl px-10 py-14 text-center max-w-md">

                <div className="flex justify-center mb-5">
                    <SignedOut>
                        <div className="flex">
                        <SignInButton><span className="text-gray-800 my-auto mx-2 hover:cursor-pointer hover:text-black">Login</span></SignInButton>
                        <SignUpButton>
                            <button className="bg-gray-800 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-black">Register</button>
                        </SignUpButton>
                        </div>
                    </SignedOut>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800">
                    Kindly login to continue
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                    You must be signed in to view this page.
                </p>
            </div>
        </div>
    );
}

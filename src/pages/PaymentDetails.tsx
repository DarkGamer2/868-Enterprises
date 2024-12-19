import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { useTheme } from "../context/theme/ThemeContext";
import { useState, useEffect } from "react";
import axios from "axios";

const PaymentDetails = () => {
    const { theme } = useTheme();

    const [fullName, setFullName] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayment = async (e: React.MouseEvent) => {
        e.preventDefault();
        await axios.post("https://localhost:3000/payment", {
            fullName: fullName,
            creditCardNumber: creditCardNumber,
            expirationDate: expirationDate,
            cvv: cvv
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className={`${theme === "dark" ? "dark" : "light"} flex flex-col min-h-screen`}>
            <NavigationBar />
            <div className="flex-grow dark:bg-black">
                <h1 className="dark:text-white text-center text-black font-bebas text-2xl">Payment Details</h1>
                <section id="payment-form">
                    <div>
                        <form>
                            <div className="flex justify-center">
                                <div className="flex flex-col">
                                    <div className="my-2">
                                        <label className="mx-1">Full Name</label>
                                        <input type="text" onChange={(e) => setFullName(e.target.value)} className="py-3 bg-slate-200 rounded-md " />
                                    </div>
                                    <div className="">
                                        <label className="mx-1">Credit Card Number</label>
                                        <input type="text" onChange={(e) => setCreditCardNumber(e.target.value)} className="py-3 bg-slate-200 rounded-md" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="mx-1">Expiration Date</label>
                                        <input type="text" onChange={(e) => setExpirationDate(e.target.value)} className="py-3 bg-slate-200 rounded-md"/>
                                    </div>
                                    <div>
                                        <label className="mx-1">CVV</label>
                                        <input type="text" onChange={(e) => setCvv(e.target.value)} className="py-3 bg-slate-200 rounded-md"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center my-3">
                                <button className="bg-blue-600 py-2 px-3 font-inter text-white" onClick={handlePayment}>Pay</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentDetails;
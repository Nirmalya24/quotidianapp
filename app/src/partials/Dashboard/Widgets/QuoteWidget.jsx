import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdRefreshCircle } from "react-icons/io";

function QuoteWidget() {

    const quoteAPI = "http://api.quotable.io/random";
    const [quote, setQuote] = useState(
        localStorage.getItem("quote")
            ? JSON.parse(localStorage.getItem("quote"))
            : null
    );

    useEffect(() => {
        console.log("useEffect")
        if (!quote) {
            getQuote()
        }
        // let now = new Date()
        let timePassed = new Date().getTime() - quote.timestamp
        let seconds = Math.floor((timePassed / 1000) % 60)
        if (quote && seconds > 86400) {
            getQuote()
        }
    }, []);

    const getQuote = async () => {
        await axios.get(quoteAPI)
            .then((response) => {
                let data = {
                    id: response.data._id,
                    author: response.data.author,
                    content: response.data.content,
                    timestamp: new Date().getTime()
                }
                console.log(data)
                setQuote(data)
                localStorage.setItem("quote", JSON.stringify(data))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            {
                quote ?
                    (
                        <div className="card w-96 bg-primary text-primary-content ml-0 m-6">
                            <div className="card-body">
                                <h2 className="card-title">{quote.content}</h2>
                                <p className="text-center">{quote.author}</p>
                                <div className="card-actions justify-end">
                                    <IoMdRefreshCircle
                                        className="text-3xl hover:animate-ping"
                                        onClick={getQuote} />
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                            <div class="animate-pulse flex space-x-4">
                                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div class="flex-1 space-y-6 py-1">
                                    <div class="h-2 bg-slate-200 rounded"></div>
                                    <div class="space-y-3">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div class="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default QuoteWidget;
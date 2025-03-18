import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from 'axios'

const Holdings = () => {
    const [file, setFile] = useState<File | null>(null);

    const [extjson,set_extjson]=useState<any>([])

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("No file selected.");
            return;
        }
    
        const formData = new FormData();
        formData.append("pdf", file);

    
        try {
            const response = await axios.post("http://localhost:5501/extract", formData, {
                withCredentials: true,  // Required for CORS with credentials
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            console.log(response.data.data);
        const jsonData = response.data.data.substring(7,response.data.data.length-3);
        set_extjson(JSON.parse(jsonData))      
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <Sidebar>
                <div className="relative">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange} // Corrected file selection logic
                    />

                    <button
                        onClick={handleUpload} // Corrected upload logic
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-2"
                    >
                        Upload
                    </button>
                </div>
                <div className="p-4 overflow-auto grid grid-cols-3 gap-x-8 gap-y-3 ml-20 mr-20 mt-32 scrollbar">
                {extjson.map((item:any, index:any) => (
                    <div 
                    key={index} 
                    className="border-l border-r border-t border-b border-l-teal-200 border-b-teal-200 border-t-violet-300 border-r-violet-300 w-11/12 p-4 drop-shadow-2xl rounded-lg hover:scale-105 transition-all duration-300 hover:border-r-teal-200 hover:border-t-teal-200 hover:border-b-violet-300 hover:border-l-violet-300 my-2 text-white shadow-md hover:-translate-y-2 bg-white bg-opacity-10"
                >
                    <div className="flex justify-between pl-8 pr-8">
                        <p className="font-extralight">Symbol:</p>
                        <p className="font-extralight">{item.symbol}</p>
                    </div>
                
                    <div className="flex justify-between pl-8 pr-8">
                        <p className="font-extralight">Security:</p>
                        <p className="font-extralight w-1/2 text-right">{item.security}</p>
                    </div>
                
                    <div className="flex justify-between pl-8 pr-8">
                        <p className="font-extralight">Market Value:</p>
                        <p className="font-extralight">{item.market_value ?? 'N/A'}</p>
                    </div>
                
                    <div className="flex justify-between pl-8 pr-8">
                        <p className="font-extralight">Current Balance:</p>
                        <p className="font-extralight">{item.current_balance}</p>
                    </div>
                
                    <div className="flex justify-between pl-8 pr-8">
                        <p className="font-extralight">Value:</p>
                        <p className="font-extralight">{item.value ?? 'N/A'}</p>
                    </div>
                
                    <div className="flex justify-between pl-8 pr-8">
                        <p className="font-extralight">Average Price:</p>
                        <p className="font-extralight">{item.average_price ?? 'N/A'}</p>
                    </div>
                </div>
                
                ))}
            </div>
            </Sidebar>
            
        </div>
    );
};

export default Holdings;

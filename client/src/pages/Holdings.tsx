import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Holdings = () => {
    const [file, setFile] = useState<File | null>(null);
    const [symbols, setSymbols] = useState<string[]>([]);
    const [newSymbol, setNewSymbol] = useState<string>('');
    const username_from_store = useSelector((state: RootState) => state.uniUsername.username);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5500/api/activity/get-data", { username: username_from_store });
                const fetchedSymbols = response.data.investments || [];
                if (Array.isArray(fetchedSymbols)) {
                    const symbolList = fetchedSymbols.map((item: any) => (typeof item === 'string' ? item : item.symbol));
                    setSymbols(symbolList);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            const extractedSymbols = response.data.data;
            if (Array.isArray(extractedSymbols)) {
                setSymbols(extractedSymbols);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleUploadData = async () => {
        try {
            await axios.post("http://localhost:5500/api/activity/upload-data", {
                investments: symbols,
                username: username_from_store
            });
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    const handleSymbolChange = (index: number, value: string) => {
        const updatedSymbols = [...symbols];
        updatedSymbols[index] = value;
        setSymbols(updatedSymbols);
    };

    const saveEdit = async (index: number) => {
        try {
            await axios.post("http://localhost:5500/api/activity/update-entry", {
                username: username_from_store,
                updatedItem: symbols[index]
            });
            console.log("Symbol successfully updated!");
        } catch (error) {
            console.error("Error updating symbol:", error);
        }
    };

    const addNewItem = () => {
        if (newSymbol.trim() !== '') {
            setSymbols([...symbols, newSymbol.trim()]);
            setNewSymbol('');
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <Sidebar>
                <div className="flex flex-col h-full p-4">
                    <div className="flex gap-4 mb-4 justify-center">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="bg-white/10 text-white p-2 rounded"
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Upload PDF
                        </button>
                        <button 
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleUploadData}
                        >
                            Update Data
                        </button>
                    </div>

                    <div className="flex gap-4 mb-6 justify-center">
                        <input
                            type="text"
                            placeholder="New Stock Symbol"
                            value={newSymbol}
                            onChange={(e) => setNewSymbol(e.target.value)}
                            className="bg-white/10 text-white p-2 rounded"
                        />
                        <button
                            onClick={addNewItem}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Add Symbol
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto rounded-lg border border-white/20 p-4 mb-24">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {symbols.map((symbol, index) => (
                                <div 
                                    key={index} 
                                    className="border border-teal-200/30 p-4 rounded-lg bg-white/10 backdrop-blur-sm flex flex-col items-center"
                                >
                                    <input
                                        type="text"
                                        value={symbol}
                                        onChange={(e) => handleSymbolChange(index, e.target.value)}
                                        className="bg-white/20 text-white w-full p-2 rounded text-center mb-2"
                                    />
                                    <button
                                        onClick={() => saveEdit(index)}
                                        className="bg-blue-500 w-full text-white px-4 py-1 rounded hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};

export default Holdings;

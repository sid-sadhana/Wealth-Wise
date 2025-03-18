import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type StockItem = {
    symbol: string;
    security: string;
    market_value: string | number | null | undefined | object;
    balance: string | number | null | undefined | object;
    current_balance: string | number | null | undefined | object;
    value: string | number | null | undefined | object;
    average_price: string | number | null | undefined | object;
};

const Holdings = () => {
    const [file, setFile] = useState<File | null>(null);
    const [extjson, setExtjson] = useState<StockItem[]>([]);
    const [newItem, setNewItem] = useState<Partial<StockItem>>({});
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const username_from_store = useSelector((state: RootState) => state.uniUsername.username);

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5500/api/activity/get-data", { username: username_from_store });
                setExtjson(response.data.investments || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    // Handle PDF upload
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

            const jsonData = response.data.data.substring(7, response.data.data.length - 3);
            setExtjson(JSON.parse(jsonData));
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // Handle data upload
    const handleUploadData = async () => {
        try {
            await axios.post("http://localhost:5500/api/activity/upload-data", {
                investments: extjson,
                username: username_from_store
            });
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    // Handle field editing
    const handleEditChange = (index: number, field: keyof StockItem, value: string) => {
        const updatedData = [...extjson];
        updatedData[index] = { ...updatedData[index], [field]: value };
        setExtjson(updatedData);
    };

    // Save edited changes
    const saveEdit = async (index: number) => {
        const updatedItem = extjson[index];
        try {
            await axios.post("http://localhost:5500/api/activity/update-entry", {
                username: username_from_store,
                updatedItem
            });
            console.log("Data successfully updated!");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    // Add new manual entry
    const addNewItem = () => {
        const completeItem: StockItem = {
            symbol: newItem.symbol || '',
            security: newItem.security || '',
            market_value: newItem.market_value || 'N/A',
            balance: newItem.balance || 'N/A',
            current_balance: newItem.current_balance || 'N/A',
            value: newItem.value || 'N/A',
            average_price: newItem.average_price || 'N/A',
        };
        setExtjson([...extjson, completeItem]);
        setNewItem({});
        setShowAddForm(false);
    };

    return (
        <div>
            <Sidebar>
                <div className="relative p-4">
                    {/* Top Button Controls */}
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
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            {showAddForm ? 'Cancel Add' : 'Add Manual Entry'}
                        </button>
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleUploadData}
                        >
                            Update Data
                        </button>
                    </div>

                    {/* Add Manual Entry Form */}
                    {showAddForm && (
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <h3 className="text-white mb-2">Add New Entry</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(extjson[0] || {}).map((field) => (
                                    <div key={field} className="flex flex-col">
                                        <label className="text-white text-sm mb-1 capitalize">{field}:</label>
                                        <input
                                            type="text"
                                            value={
                                                typeof newItem[field as keyof StockItem] === 'object'
                                                    ? JSON.stringify(newItem[field as keyof StockItem])
                                                    : (newItem[field as keyof StockItem] ?? '').toString()
                                            }
                                            onChange={(e) =>
                                                setNewItem({ ...newItem, [field]: e.target.value })
                                            }
                                            className="bg-white/20 text-white p-2 rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addNewItem}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Save New Entry
                            </button>
                        </div>
                    )}

                    {/* Editable Data Display */}
                    <div className="grid grid-cols-3 gap-4 overflow-auto h-[75vh] mt-16">
                        {extjson.map((item, index) => (
                            <div 
                                key={index} 
                                className="border border-teal-200/30 p-4 rounded-lg bg-white/10 backdrop-blur-sm"
                            >
                                <div className="space-y-2">
                                    {Object.entries(item).map(([field, value]) => (
                                        <div key={field} className="flex justify-between items-center">
                                            <span className="text-white/70 capitalize">{field}:</span>
                                            <input
                                                type="text"
                                                value={
                                                    value === null || value === undefined
                                                        ? ''
                                                        : typeof value === 'object'
                                                        ? JSON.stringify(value)
                                                        : value.toString()
                                                }
                                                onChange={(e) =>
                                                    handleEditChange(index, field as keyof StockItem, e.target.value)
                                                }
                                                className="bg-white/20 text-white p-1 w-28 text-right rounded"
                                            />
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => saveEdit(index)}
                                        className="w-full mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};

export default Holdings;

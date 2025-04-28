import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Track = () => {
    const [selectedModel, setSelectedModel] = useState<string>("PROPHET");
    const [investments, setInvestments] = useState<string[]>([]);
    const [selectedStock, setSelectedStock] = useState<string>("");
    const [sliderValue, setSliderValue] = useState<number>(10);
    const username_from_store = useSelector((state: RootState) => state.uniUsername.username);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const response = await axios.post("http://localhost:5500/api/activity/get-data", {
                    username: username_from_store
                });
                const fetchedInvestments = response.data.investments || [];
                if (Array.isArray(fetchedInvestments)) {
                    const symbols = fetchedInvestments.map((item: any) => (typeof item === "string" ? item : item.symbol));
                    setInvestments(symbols);
                }
            } catch (error) {
                console.error("Error fetching investments:", error);
            }
        };

        fetchInvestments();
    }, [username_from_store]);

    const handlePredict = () => {
        console.log("Selected Model:", selectedModel);
        console.log("Selected Stock:", selectedStock);
        console.log("Slider Value:", sliderValue);
    };

    return (
        <div className="h-screen overflow-hidden">
            <Sidebar>
                <div className="flex flex-col gap-8 p-8">
                    <div className="flex flex-wrap gap-6">
                        {["PROPHET", "LSTM", "RNN", "GRU"].map((model) => (
                            <label key={model} className="flex items-center gap-3 cursor-pointer text-white">
                                <input
                                    type="radio"
                                    name="model"
                                    value={model}
                                    checked={selectedModel === model}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className="appearance-none w-12 h-12 border-2 border-white rounded-full checked:bg-white checked:border-white focus:outline-none transition-all duration-200"
                                />
                                <span className="capitalize">{model}</span>
                            </label>
                        ))}
                    </div>

                    <div>
                        <select
                            value={selectedStock}
                            onChange={(e) => setSelectedStock(e.target.value)}
                            className="w-full bg-black bg-opacity-30 text-white p-2 rounded border border-white"
                        >
                            <option value="" className="bg-black text-white">Select a Stock</option>
                            {investments.map((symbol, index) => (
                                <option key={index} value={symbol} className="bg-black text-white">
                                    {symbol}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-row gap-2">
                        <label className="text-white w-20 text-center text-lg font-bold bg-black p-4 h-12 rounded-2xl bg-opacity-20 border-white border">{sliderValue}</label>
                        <input
                            type="range"
                            min={10}
                            max={1000}
                            step={10}
                            value={sliderValue}
                            onChange={(e) => setSliderValue(Number(e.target.value))}
                            className="w-1/2 h-12 bg-black bg-opacity-10 border border-white rounded-lg appearance-none cursor-pointer"
                        />
                        <button
                            className="w-1/2 h-12 rounded-2xl bg-white bg-opacity-0 text-white text-xl border border-white"
                            onClick={handlePredict}
                        >
                            Predict
                        </button>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};

export default Track;

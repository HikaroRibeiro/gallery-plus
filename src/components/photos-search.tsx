/* eslint-disable react-hooks/exhaustive-deps */
import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import { useCallback, useState } from "react";
import { debounce } from "../helpers/utils";

export default function PhotosSearch() {
    const [inputValue, setInputValue] = useState("");

    const debouncedSetValue = useCallback(debounce((value: string) => {
        console.log("Debounced value:", value);
    }, 300), []);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value= e.target.value;

        setInputValue(value);
        debouncedSetValue(value);
    }
    return (
        <InputText 
            icon={SearchIcon}
            placeholder="Buscar fotos"
            value={inputValue}
            className="flex-1"
            onChange={handleInputChange}
        />
    )
}
"use client";

import { ChangeEvent, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Input } from "./input";
import { IKabupaten } from "@/types/Data";
import { ControllerRenderProps } from "react-hook-form";

export function ComboBox({
  options,
  field,
  placeholder,
}: {
  options: IKabupaten[];
  field: ControllerRenderProps<any>;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (item: IKabupaten) => {
    setSelectedValue(item.value);
    setInputValue(item.value);
    field.onChange(item.value)
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    field.onChange(e.target.value)
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow for option selection
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          {...field}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:border-gray-400 transition-colors"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between group"
              >
                <div>
                  <div className="text-gray-900">{item.label}</div>
                </div>
                {selectedValue === item.label && (
                  <Check className="h-4 w-4 text-gray-600" />
                )}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">Item tidak ditemukan</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ComboBox;

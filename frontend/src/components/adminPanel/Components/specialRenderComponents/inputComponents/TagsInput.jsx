import React, { useState } from 'react';

const TagsInput = ({ tags, placeholder, onUpdateTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                const updatedTags = [...tags, newTag];
                onUpdateTags(updatedTags);
            }
            setInputValue('');
        } else if (e.key === 'Backspace' && inputValue === '') {
            const updatedTags = [...tags];
            updatedTags.pop();
            onUpdateTags(updatedTags);
        }
    };

    const handleAddButtonClick = () => {
        const newTag = inputValue.trim();
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag];
            onUpdateTags(updatedTags);
        }
        setInputValue('');
    };

    const handleTagDelete = (tagToDelete) => {
        const updatedTags = tags.filter((tag) => tag !== tagToDelete);
        onUpdateTags(updatedTags);
    };

    return (
        <div>
            <div>
                {tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center bg-gray-200 text-gray-700 text-sm font-semibold py-1 px-2 rounded-md mr-2 mb-2">
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleTagDelete(tag)}
                            className="ml-2 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-600 hover:text-red-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>

                ))}
            </div>
            <div className="mt-2">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={handleAddButtonClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 ml-2 rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default TagsInput;

import {forwardRef} from 'react';
//
const AssessmentChoice = forwardRef(({choiceId, choice_desc, onChange}, ref) => {
    return (
        <div

            className="flex items-center bg-slate-300  rounded-2xl px-2 py-3 hover:bg-slate-600 hover:cursor-pointer mb-2"

        >
            <input
                onChange={onChange}
                id="default-radio-2"
                
                type="radio"
                value={choiceId}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-red-200    "/>
            <label htmlFor="default-radio-2"
                   className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {choice_desc}
            </label>

        </div>
    )
})
export default AssessmentChoice
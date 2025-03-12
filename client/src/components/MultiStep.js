import React from 'react';

const MultiStep = ({ total, progress }) => {
    // console.log(total);
    // console.log(progress);
    return (
        <div className="w-full flex justify-center">
            <div className={`${total} w-full`}>
                <div className="bg-white h-1 rounded-full" style={{ width: `${progress}%`,transition: 'all 300ms ease-in-out' }}></div>
            </div>
        </div>
    );
};

export default MultiStep;

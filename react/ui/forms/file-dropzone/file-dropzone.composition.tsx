import React from 'react';
import { FileDropzone } from './file-dropzone';

export const BasicFileDropzone = () => {
    const handleFileSelected = (files) => {
        console.log(files);
    }

    return (
        <FileDropzone
            extensions=".ods,.csv,.xls,.xlsx"
            onFileSelected={ handleFileSelected } />
    )
};

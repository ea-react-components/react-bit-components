import React, { ChangeEvent, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

import { container, dropzone } from './file-dropzone.styles';

export interface ReactDropFile extends File {
    path: string;
}

export type OnDropFileEvent = (file: File) => void;

export type FileDropzoneProps = {
    /**
     * The supported extensions to be handled.
     */
    extensions?: string | string[];

    /**
     * The label to show when there is no dragging
     */
    label?: string;

    /**
     * The label to show when a dragging is happening
     */
    labelDragging?: string;

    /**
     * Event function to be called when a drop occurs
     */
     onFileSelected: OnDropFileEvent;
};

const defaultProps: Omit<FileDropzoneProps, 'onFileSelected'> = {
    extensions: [],
    label: `Drag 'n' drop some files here, or click to select files`,
    labelDragging: 'Drop the files here...',
}

export function FileDropzone({
    extensions = defaultProps.extensions,
    label = defaultProps.label,
    labelDragging = defaultProps.labelDragging,
    onFileSelected
}: FileDropzoneProps) {
    let allowedExtensions = [];
    
    // Parse the extensions from either a string or an array
    if (typeof extensions === 'string') {
        allowedExtensions = extensions.split(',');
    } else {
        allowedExtensions = [...extensions];
    }

    // Wrapping drop function to run some validations before calling the prop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length) {
            onFileSelected(acceptedFiles[0]);
        }
    }, []);

    // Dropzone hook
    const { fileRejections, isDragActive, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: extensions
    });

    // The rejected files are mapped to an html list
    const fileRejectionItems = fileRejections.map(({ file, errors }: FileRejection) => {
        const dropFile = file as ReactDropFile;

        return (
            <li key={dropFile.path}>
                {dropFile.path} - {file.size} bytes
                <ul>
                    {errors.map(e => (
                        <li key={e.code}>{e.message}</li>
                    ))}
                </ul>
            </li>
        );
    });

    // Wrapping function to handle the selection by clicking
    const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            onFileSelected(event.target.files[0]);
        }
    }

    // Component template
    return (
        <div id="drop-container" className="container" style={ container } {...getRootProps()}>
            <div className="dropzone" style={ dropzone }>
                <input className="uploader" {...getInputProps()} onChange={handleFileSelection} />
                {
                    isDragActive ?
                        <p>{labelDragging}</p> :
                        <p>{label}</p>
                }
            </div>

            <ul>{ fileRejectionItems }</ul>
        </div>
    );
}

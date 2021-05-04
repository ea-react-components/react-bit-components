import React from 'react';
import { queryByAttribute, render } from '@testing-library/react';

import { BasicFileDropzone } from './file-dropzone.composition';

const getById = queryByAttribute.bind(null, 'id');

it('should render with the correct text', () => {
    const { container } = render(<BasicFileDropzone />);
    const rendered = getById(container, 'drop-container');
    expect(rendered).toBeTruthy();
});

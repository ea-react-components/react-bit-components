import { CSSProperties } from 'react'

export const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
}

export const dropzone: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
}

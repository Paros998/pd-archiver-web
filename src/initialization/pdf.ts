import {pdfjs} from 'react-pdf';
import {useEffect} from "react";

export const usePdf = () => {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.js',
            import.meta.url,
        ).toString();
    }, []);
}
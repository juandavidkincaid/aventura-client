import { useMemo, useEffect } from 'react';
import { NC } from '.';

// Tab Title Component for react

const Title = NC<{ title: string }>('Title', ({ title }) => {
    const oldTitle = useMemo(() => document.title, []);
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = oldTitle;
        }
    }, []);
    return null;
})

export {
    Title
}
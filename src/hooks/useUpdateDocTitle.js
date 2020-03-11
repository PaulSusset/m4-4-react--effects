import { useEffect } from "react";

const useUpdateDocTitle = (funTitle, baseTitle) => {
    useEffect(() => {
        document.title = funTitle;

        return () => {
            document.title = baseTitle;
        };
    });
};

export default useUpdateDocTitle;

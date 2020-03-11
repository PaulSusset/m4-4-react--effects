import { useEffect } from "react";

const useEffectKey = (code, callback) => {
    useEffect(() => {
        function handleKeydown(ev) {
            if (ev.code === code) {
                ev.preventDefault();
                callback(ev);
            }
        }

        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    });
};

export default useEffectKey;

import { useEffect, useState } from "react"
import axios from "axios"
const useSearch = (url) => {

    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await axios.get(url,{withCredentials:true});
                setResult(res.data)
                console.log(res)
            }
            catch (error) {
                setError(error)
            }
            setLoading(false)

        };
        fetchData();
    }, [url]);


    const reFetchData = async () => {
        setLoading(true);

        try {
            const res = await axios.get(url);
            setResult(res.data)
        }
        catch (error) {
            setError(error)
        }
        setLoading(false)

    };
    return {result,loading,error,reFetchData}
};
export default useSearch;

import Job from "@/components/job"
import axios from "@/config/axios"
import { setJobsData } from "@/services/features/jobSlice"
import { AppDispatch, RootState } from "@/services/store"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function BrowsePage() {
    const { searchQuery, jobsData } = useSelector((state: RootState) => state.job)
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`/job/all-jobs?keyword=${searchQuery}`)
                dispatch(setJobsData(response.data.data))
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error)
                }
            }
        }
        fetchJobs()
    }, [searchQuery, dispatch])

    return (
        <section className='max-w-7xl mx-auto my-10 min-h-screen'>
            <h1 className='font-bold text-xl my-10'>Search Results ({jobsData.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    jobsData.map((job) => {
                        return (
                            <Job key={job._id} job={job} />
                        )
                    })
                }
            </div>

        </section>

    )
}

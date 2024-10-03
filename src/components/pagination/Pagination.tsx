"use client"
import { generatePagination } from "@/libs/generate-pagination/generate-pagination";
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

   

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage2 = searchParams.has('page') ? Number(searchParams.get('page')) : 1;

   const allPages = generatePagination( currentPage2 , totalPages );

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if(pageNumber === '...'){
            return `${pathname}?${params.toString()} `
        }

       

        if (Number(pageNumber) < 1) {
            return `${pathname}`
        }



        params.set('page', pageNumber.toString())


        return `${pathname}?${params.toString()} `

    }



    return (
        <div className="max-w-screen-xl mx-auto mt-12  text-gray-600 md:px-8">
            <div className="flex justify-between text-sm ">
                <div className="flex items-center  gap-3 md:gap-12" aria-label="Pagination">
                    <Link href={createPageUrl(currentPage2 - 1)}  className={`hover:text-indigo-600 ${ Number(currentPage2) + -1 < 1 && "hidden" }`}>
                        Previous
                    </Link>
                    <ul className="flex items-center gap-1">
                        {
                            allPages.map((page, idx) => (
                               <li key={ page + '-' + idx } className={
                                `p-2 rounded-lg text-white ${currentPage2 === page ? 'bg-indigo-600' : "bg-slate-700 hover:bg-slate-800"}` 
                               } >
                                    <Link href={createPageUrl(page)}>
                                        {page}
                                    </Link>
                               </li>
                            ))
                        }
                    </ul>
                    <Link href={createPageUrl(currentPage2 + 1)} className={`hover:text-indigo-600 ${ Number(currentPage2) + 1 > totalPages && "hidden" }`}>
                        Next
                    </Link>
                </div>
            </div>
           
        </div>
    )
}
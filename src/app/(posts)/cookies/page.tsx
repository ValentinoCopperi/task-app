import CookiesPage from "@/components/cookies/Cookies";
import Products from "@/components/cookies/productsCookieTest/Products";
import { cookies } from "next/headers";

export default function page() {

    const cookieStore = cookies() 
    const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1');


        
  return (
   <div>
        <CookiesPage cookieTab={cookieTab}/>  
        <Products/>
   </div>
  )
}

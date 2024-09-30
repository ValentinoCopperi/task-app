
import CloseSearchButton from './close/CloseSearchButton';
import UserList from './UserList/UserList';

interface Props{
    handleSearchOpen : () => void;
}



export default  function SearchUsers({handleSearchOpen}:Props) {


   

  return (
    <div className='fixed  z-30 w-screen h-screen bg-black text-center text-white bg-opacity-80'>
        
        <UserList/>

        <CloseSearchButton handleSearchOpen={handleSearchOpen} />
    </div>
  )
}

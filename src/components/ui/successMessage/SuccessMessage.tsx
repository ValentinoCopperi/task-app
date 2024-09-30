

interface Props {
    message : string;
    bg : string;
}




export const SuccessMessage = ({ message , bg }: Props) => (
    <div className={`fixed z-20 top-4 right-4 text-white px-6 py-4 text-2xl rounded shadow-lg ${bg}`}>
        {message}
    </div>
);
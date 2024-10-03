import { XIcon } from 'lucide-react';
import React, { useState } from 'react'
import * as api from '@/helpers/todos/todos'
import { useRouter } from 'next/navigation';

interface Props {
    handleModalBiography: () => void;
    bio?: string | undefined
}

export default function ModalBiography({ handleModalBiography, bio }: Props) {
    const [value, setValue] = useState<string>(bio ? bio : '');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga

    const router = useRouter()

    const handleNewBio = async () => {
        if (value.length < 1) {
            setError("Biography cannot be empty.");
            setTimeout(() => setError(null), 3000);
            return;
        }

        try {
            setLoading(true); // Inicia el estado de carga
            await api.updateBio(value);
            router.refresh();
            setError('Biography updated');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Unknown error happened');
            }
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-white text-xl">New Biography</label>
                        <button onClick={handleModalBiography} className="text-gray-400 hover:text-white">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                        placeholder="Enter your new biography..."
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleNewBio}
                            disabled={loading} // Deshabilita el botón durante la carga
                            className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                    {error && (
                        <h1 className="text-red-300 text-ellipsis text-xl uppercase text-center">{error}</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

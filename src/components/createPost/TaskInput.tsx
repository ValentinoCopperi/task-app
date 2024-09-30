import React from 'react'

interface Props {

  title : string;
  setTitle : ( title : string ) => void;
  description: string;
  setDescription: (description: string) => void;

}

export default function TaskInput( {title,setTitle,description,setDescription} : Props ) {
  return (
    <div className="w-full space-y-4">
      {/* Input para el título */}
      <input
        type="text"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        placeholder="Título"
        className="
          w-full 
          h-10 
          bg-gray-800 
          text-white 
          placeholder-gray-400 
          rounded-lg 
          pl-4 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          transition-all
        "
      />
      
      {/* Input para la descripción */}
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
        rows={5} // Ajusta el tamaño vertical según necesites
        className="
          w-full 
          bg-gray-800 
          text-white 
          placeholder-gray-400 
          rounded-lg 
          pl-4 
          py-2
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          transition-all
          resize-none
        "
      />
    </div>
  );
}

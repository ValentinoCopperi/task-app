import { Category } from '@/types'
import React from 'react'

interface Props {
  categories : Category[]
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}



export default function TaskFilters({ categories , selectedCategory , setSelectedCategory }: Props) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="
        w-full 
        h-12 
        bg-gray-800 
        text-white 
        placeholder-gray-400 
        rounded-lg 
        pl-4 
        pr-4 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        transition-all
        border border-gray-700
        appearance-none
        text-lg
      "
    > 
      <option value="" disabled>
        Selecciona una categoría
      </option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
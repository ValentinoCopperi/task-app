import ButtonVolverHome from '@/components/ui/buttons/ButtonVolverHome'

export default function NotFound() {
  return (
    <div className=" w-full px-16 md:px-0 h-screen flex items-center justify-center">
      <div className="border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Not Found ERROR</p>
        <ButtonVolverHome text='VOLVER' />
      </div>
    </div>
  )
}
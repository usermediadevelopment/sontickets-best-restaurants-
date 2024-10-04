'use client'

import { useState } from 'react'
import { Search, ChevronDown, Menu, MapPin, Instagram, X, Utensils, Beef, Cake, Coffee, Egg, Fish, Pizza, Salad, Sandwich } from 'lucide-react'
import { Input } from '@/lib/design-system/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/design-system/sheet'
import { Button } from '@/lib/design-system/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/lib/design-system/dropdown-menu'
import { defineQuery, FilteredResponseQueryOptions } from 'next-sanity'

const options: FilteredResponseQueryOptions = {
    next: {
        revalidate: 60,
    }
};

const CUISINE_QUERY = defineQuery(`*[_type == "cuisine" ]`);


export default function asyncMainLayout({ children }: { children: React.ReactNode }) {
    const [selectedCity, setSelectedCity] = useState('Medellín')

    const cities = ['Medellín', 'Envigado', 'Sabaneta', 'Llano Grande', 'Rionegro']
    console.log(cities)



    const categories = [
        { name: 'Turbo Recomendado', icon: Utensils },
        { name: 'Comida Rápida', icon: Pizza },
        { name: 'Pollo', icon: Beef },
        { name: 'Experiencias', icon: Coffee },
        { name: 'Saludable', icon: Salad },
        { name: 'Sándwiches', icon: Sandwich },
        { name: 'Hamburguesas', icon: Beef },
        { name: 'Típica', icon: Utensils },
        { name: 'Panadería', icon: Cake },
        { name: 'Pescados', icon: Fish },
        { name: 'Sushi', icon: Fish },
        { name: 'Pizza', icon: Pizza },
        { name: 'Salchipapas', icon: Beef },
        { name: 'Arepas', icon: Cake },
        { name: 'Desayunos', icon: Egg },
        { name: 'Árabe', icon: Utensils },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white border-b border-gray-200">
                <div className="px-4 md:px-20 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl md:text-2xl font-bold text-purple-600">
                                <span className="block md:inline">mejores</span>
                                <span className="block md:inline">restaurantes.co</span>
                            </h1>
                            <div className="relative hidden md:block">
                                <Input
                                    type="search"
                                    placeholder="Buscar restaurantes o platos"
                                    className="pl-10 pr-4 py-2 w-[450px]"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div className="flex  justify-end space-x-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu size={24} />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="py-4">
                                        <Button variant="ghost" className="w-full justify-start">Iniciar sesión</Button>
                                        <Button variant="ghost" className="w-full justify-start">Registrarme</Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center px-3 py-2 text-sm border rounded-[5px]">
                                        <MapPin size={16} className="mr-2" />
                                        <span>{selectedCity}</span>
                                        <ChevronDown size={16} className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[200px] bg-white ">
                                    {cities.map((city) => (
                                        <DropdownMenuItem
                                            key={city}
                                            onSelect={() => setSelectedCity(city)}
                                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            {city}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" className="hidden md:inline-flex px-3 py-2 text-sm text-purple-600 border border-purple-600 rounded-[5px]">
                                Registrarme
                            </Button>
                            <Button variant="outline" className="hidden md:inline-flex px-3 py-2 text-sm text-purple-600 border border-purple-600 rounded-[5px]">
                                Iniciar sesión
                            </Button>
                        </div>
                    </div>
                </div>
                <nav className="bg-gray-50" aria-label="Filtros de búsqueda">
                    <div className="container mx-auto px-4 py-4 overflow-x-auto">
                        <div className="flex space-x-6 min-w-max">
                            {categories.map((category, index) => (
                                <button key={index} className="flex flex-col items-center space-y-1 focus:outline-none group">
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                        <category.icon size={32} className="text-gray-600 group-hover:text-purple-600 transition-colors" />
                                    </div>
                                    <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>

            <main className='flex bg-gray-100 min-h-screen flex-col px-24 gap-12'>
                {children}
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold">mejoresrestaurantes.co</h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                            <Button variant="link" className="text-white hover:text-gray-300 transition-colors">
                                Términos y Condiciones
                            </Button>
                            <Button variant="link" className="text-white hover:text-gray-300 transition-colors">
                                Política de Privacidad
                            </Button>
                            <Button variant="link" className="text-white hover:text-gray-300 transition-colors flex items-center">
                                <Instagram size={20} className="mr-2" />
                                Instagram
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
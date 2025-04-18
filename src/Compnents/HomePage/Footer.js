import React from 'react'
import Logo from '../../Assets/Images/qt=q_95.webp'

export default function Footer() {
    return (
        <>
            <footer class="bg-white rounded-t-lg shadow dark:bg-gray-900 mt-4">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={Logo} alt="logo" className='w-[150px]' />
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Home</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Tracks</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Careers</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">Coach Academy</a>. All Rights Reserved.</span>
                </div>
            </footer>


        </>
    )
}

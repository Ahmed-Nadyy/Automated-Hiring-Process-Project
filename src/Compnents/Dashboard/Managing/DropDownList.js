import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function DropDownList({ cat, onCategoryChange, includeAll }) {
    const categories = ['university', 'school pst', 'school diploma', 'grads', 'CFK', 'private', 'flutter', 'frontend', 'backend'];
    const dropdownItems = includeAll ? ['All Categories', ...categories] : categories;

    return (
        <div>
            <Menu as="div" className="relative text-left">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gradient-to-r from-black via-blue-800 to-blue-500 p-[1px]">
                    <div className="flex w-full items-center justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                        {cat || 'Category'}
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 w-5 h-5 text-gray-400" />
                    </div>
                </MenuButton>

                <MenuItems className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                    {dropdownItems.map((category) => (
                        <MenuItem key={category}>
                            {({ active }) => (
                                <button
                                    onClick={() => onCategoryChange(category)}
                                    className={`block w-full px-4 py-2 text-left text-sm ${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    }`}
                                >
                                    {category}
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    );
}

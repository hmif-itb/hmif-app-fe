import { useQuery } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';
import { DrawerClose, DrawerFooter } from '~/components/ui/drawer';
import Options from './options';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '~/api/client';
import { Form } from '~/components/ui/form';
import useWindowSize from '~/hooks/useWindowSize';
import { CategorySchemaType, CategorySchema } from '../-constants';
import { FilterRekomendasiProps } from '../-types';

export default function FilterRekomendasi({
    filter,
    setFilter,
    handleCloseDrawer,
}: FilterRekomendasiProps) {
    const windowSize = useWindowSize();

    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            category: filter.category || 'Ganesha',
        },
    });

    const handleOptionChange = () => {
        form.handleSubmit(handleSubmit)(); // Auto-submit the form
    };

    const handleSubmit = (data: CategorySchemaType) => {
        setFilter({
            category: data.category,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="px-6">
                <div>
                    <div className="flex items-baseline justify-between px-0">
                        <h1 className="text-heading-md font-bold text-green-400">
                            Filters
                        </h1>
                        <Button
                            variant="link"
                            type="button"
                            onClick={() => {
                                form.setValue('category', ['Ganesha', 'Jatinangor']);
                                handleSubmit(form.getValues()); // Auto-refresh after reset
                            }}
                        >
                            <span className="text-body-lg font-semibold text-green-400">
                                Reset
                            </span>
                        </Button>
                    </div>

                    <Options
                        form={form}
                        header='category'
                        choices={['Ganesha', 'Jatinangor']}
                        onChange={handleOptionChange}
                    />
                </div>
                {windowSize.width < 1024 ? (
                    <DrawerFooter className="flex flex-row justify-between px-0">
                        <DrawerClose asChild>
                            <Button
                                type="submit"
                                className="rounded-full bg-green-300 px-12 py-3 text-white"
                                onClick={handleCloseDrawer}
                            >
                                Apply
                            </Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button
                                variant="outlined"
                                className="rounded-full border-2 border-green-300 px-12 py-3 text-green-500"
                                onClick={handleCloseDrawer}
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                ) : (
                    <div className="flex flex-col justify-around gap-4">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full rounded-full bg-green-300 px-12 py-3 text-white"
                        >
                            Apply
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
}




// type RekomendasiFilterProps = {
//     activeOption: 'None' | 'Jatinangor' | 'Ganesha';
//     onToggle: (option: 'None' | 'Jatinangor' | 'Ganesha') => void;
// }

// const FilterRekomendasi: React.FC<RekomendasiFilterProps> = ({ activeOption, onToggle}) => {
//     return (
//         <div className="flex rounded-t-xl bg-green-50 flex-col w-full z-50 fixed bottom-0 p-5">
//             <div className="flex text-green-900 font-semibold justify-between">
//                 <h1 className="text-xl">
//                     Filter
//                 </h1>
//                 <button
//                     onClick={() => onToggle('None')}
//                 >
//                     Reset
//                 </button>
//             </div>
//             <div className="flex flex-col py-5">
//                 Category
//                 <div className="flex gap-3 text-xs">
//                     <button
//                         className={'flex rounded-full border border-black border-1 p-1 px-3'}
//                         onClick={() => onToggle('Ganesha')}
//                     >
                        
//                         Ganesha
//                     </button>
//                     <button
//                         className={'rounded-full border border-black border-1 p-1 px-3'}
//                         onClick={() => onToggle('Jatinangor')}
//                     >
//                         Jatinangor
//                     </button>
//                 </div>
//             </div>
//             <div className="flex items-center justify-center gap-3 ">
//                 <button className="rounded-full p-1 px-7 bg-green-900 text-white">
//                     Apply
//                 </button>
//                 <button className="rounded-full p-1 px-7 border border-1 border-green-900">
//                     Cancel
//                 </button>
//             </div>

//         </div>
//     )
// }

// export default FilterRekomendasi;
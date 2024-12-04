import { createFileRoute, useNavigate } from '@tanstack/react-router'
import SearchIcon from '~/assets/icons/textfield/search.svg';
import { TextField } from '~/components/ui/textfield';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { DEBOUNCE_TIME } from '~/lib/constants';
import CoWorkingCard from './-components/CoWorkingCard';
import Vouchercard from './-components/VoucherCard';
import MenuPage from './-components/MenuPage';
import FilterRekomendasi from './-components/FilterRekomendasi';
import backgroundImage from '~/assets/icons/rekomendasi/background.png';
import { z } from 'zod';

const timelineSearchSchema = z.object({
    search: z.string().optional(),
    category: z.array(z.string()).optional(),
  });


export const Route = createFileRoute('/_app/_left-navbar/home/rekomendasi/')({
  component: RekomendasiPage,
  validateSearch: (search) => timelineSearchSchema.parse(search),
});

function RekomendasiPage() {

    // Search
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate({ from: Route.fullPath });
    const { search } = Route.useSearch();
    const [searchInput, setSearchInput] = useState(search ?? '');
    const setSearch = (value: string) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setSearchInput(value);
        timeoutRef.current = setTimeout(() => {
          navigate({
            search: (prev) => ({
              ...prev,
              search: value || undefined,
            }),
          });
        }, DEBOUNCE_TIME);
      };

    // Menu
    const [activeOption, setActiveOption] = useState<'CoWorking' | 'Voucher'>('Voucher');

    // FIlter
    const [activeFilter, setActiveFilter] = useState<'None' | 'Ganesha' | 'Jatinangor'>('None');

    const { data: searchResult } = useQuery({
        queryKey: [],
    });

    return (
        <div className="flex size-full h-screen flex-col"
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}>
            
            <main className='px-3'>
                <h1 className="mb-3 mt-[50px] text-3xl font-bold text-white">
                    Recommendations
                </h1>
                <FilterRekomendasi/>

                <TextField
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                        }
                        setTimeout(() => setSearch(e.target.value), DEBOUNCE_TIME);
                      }}
                      className="h-10 w-full rounded-full font-semibold"
                      name="search"
                >
                    <img src={SearchIcon} className="size-4" />
                </TextField>

                <div className="mt-6">
                    <MenuPage
                        activeOption={activeOption}
                        onToggle={(option) => setActiveOption(option)}
                    />
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
                    {activeOption === 'Voucher' ? (
                        <>
                            <Vouchercard
                                imageUrl="https://placehold.co/600x400"
                                title="UPNORMAL"
                                rating={4.5}
                                calendar="XX XX XXXX"
                                link="https://link.com"
                            />
                            <Vouchercard
                                imageUrl="https://placehold.co/600x400"
                                title="UPNORMAL"
                                rating={4.5}
                                calendar="XX XX XXXX"
                                link="https://link.com"
                            />
                        </>
                    ) : (
                        <>
                            <CoWorkingCard
                                imageUrl="https://placehold.co/600x400"
                                title="UPNORMAL"
                                rating={4.5}
                                location="Jl Ganesha No 10"
                                kampus="Jatinangor"
                                mapsLink="https://maps.google.com/"
                            />
                            <CoWorkingCard
                                imageUrl="https://placehold.co/600x400"
                                title="UPNORMAL"
                                rating={4.5}
                                location="Jl Ganesha No 10"
                                kampus="Ganesha"
                                mapsLink="https://maps.google.com/"
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

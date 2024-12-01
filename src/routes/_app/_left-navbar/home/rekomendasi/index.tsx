import { createFileRoute } from '@tanstack/react-router'
import SearchIcon from '~/assets/icons/textfield/search.svg';
import { TextField } from '~/components/ui/textfield';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { DEBOUNCE_TIME } from '~/lib/constants';
import SingleSelect from '~/components/custom-form/fields/SingleSelect';
import CoWorkingCard from './-components/CoWorkingCard';
import Vouchercard from './-components/VoucherCard';
import MenuPage from './-components/MenuPage';

export const Route = createFileRoute('/_app/_left-navbar/home/rekomendasi/')({
  component: RekomendasiPage,
});

function RekomendasiPage() {
    const timeoutRef = useRef<number | null>(null);

    const [search, setSearch] = useState<string>('');
    const [activeOption, setActiveOption] = useState<'CoWorking' | 'Voucher'>('Voucher');

    const { data: searchResult } = useQuery({
        queryKey: [],
    });

    return (
        <div className="flex size-full h-screen flex-col px-3">
            <main>
                <h1 className="mb-3 mt-[50px] text-4xl font-bold text-black">
                    Recommendations
                </h1>

                <TextField
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                        }
                        setTimeout(() => setSearch(e.target.value), DEBOUNCE_TIME);
                      }}
                      className="h-12 w-full rounded-full font-semibold"
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
                                calendar="tanggal anu"
                                link="https://link.com"
                            />
                            <Vouchercard
                                imageUrl="https://placehold.co/600x400"
                                title="UPNORMAL"
                                rating={4.5}
                                calendar="tanggal anu"
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

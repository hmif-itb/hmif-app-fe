// import {
//   FormField,
//   FormControl,
//   FormItem,
//   FormMessage,
// } from '~/components/ui/form';
// import { ComponentProps } from '../-constants';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '~/components/ui/select';
// import { api } from '~/api/client';
// import { useQuery } from '@tanstack/react-query';

// export default function Categories({ form }: ComponentProps): JSX.Element {
//   const { data } = useQuery({
//     queryKey: ['categories'],
//     queryFn: () => api.category.getListCategory(),
//   });

//   return (
//     <div>
//       <FormField
//         control={form.control}
//         name="category"
//         render={({ field }) => (
//           <FormItem>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//               <FormControl>
//                 <SelectTrigger>
//                   <div className="flex">
//                     <SelectValue placeholder="Select a category" />
//                     <FormMessage className="ml-4" />
//                   </div>
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {data?.categories.map((category) => (
//                   <SelectItem key={category.id} value={`${category.name}`}>
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <FormControl></FormControl>
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// }
